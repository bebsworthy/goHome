import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { EventInformation } from "./types";
import { saveEvent } from './api_client';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Configuration interface
interface Config {
  openApiUrl: string;
  imageFolder: string;
  apiKey?: string;
}

// Load configuration from environment variables
const config: Config = {
  openApiUrl: process.env.OPENAI_API_ENDPOINT || '',
  imageFolder: process.env.EVENT_IMAGE_FOLDER || '',
  apiKey: process.env.OPENAI_API_KEY,
};

// Validate configuration
if (!config.imageFolder || !config.apiKey) {
  console.error('Error: Required environment variables are not set.');
  console.error('Please set EVENT_IMAGE_FOLDER and OPENAI_API_KEY');
  process.exit(1);
}

// Initialize OpenAI client
const openai = new OpenAI({
  baseURL: config.openApiUrl,
  apiKey: config.apiKey
});

// Function to check if a file is an image
const isImage = (filename: string): boolean => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  return imageExtensions.includes(path.extname(filename).toLowerCase());
};

// Function to get all image files from a directory
const getImageFiles = (directory: string): string[] => {
  try {
    const files = fs.readdirSync(directory);
    return files.filter(file => isImage(file));
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
};

// Function to process an image with OpenAI Vision
export async function processImage(imagePath: string): Promise<EventInformation | null> {
  try {
    const imageData = await fs.promises.readFile(imagePath);
    const base64Image = imageData.toString('base64');

    const response = await openai.chat.completions.create({
      model: "gemma3",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Please analyze this image and extract the following event information:
                - title the title of the event as written in the image
                - dates converted to YYYY-MM-DD format, an event is over multiple days this should be an array
                - time (if available, as written in the image)
                - startTime (if available, in HH:MM format)
                - endTime (if available, in HH:MM format)
                - location (if available, as written in the image)
                - city (if available)
                - description
                - organizer (if available)
                - price (if available)
                - category (if you can determine it)
                - email (if available)
                - phone (if available)
                - rawText (all the text that can be extracted from the image a concatenation of all text in the image)
                
                If any of these fields are not available leave them out of the response.
                The image most likely contains a flyer or poster for an event, so please focus on extracting the relevant information.
                The text of the flying is most likely in French, do not translate it.

                Please format the response as a JSON object with these fields.`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in response');
    }

    return JSON.parse(content) as EventInformation;
  } catch (error) {
    console.error(`Error processing image ${imagePath}:`, error);
    return null;
  }
}

// Main function to process all images in the directory
export async function processImagesDirectory() {
  console.log('Starting image processing...');
  console.log(`Looking for images in: ${config.imageFolder}`);

  const imageFiles = getImageFiles(config.imageFolder);

  if (imageFiles.length === 0) {
    console.log('No image files found in the specified directory.');
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) to process.`);

  for (const imageFile of imageFiles) {
    const imagePath = path.join(config.imageFolder, imageFile);
    console.log(`\nProcessing: ${imageFile}`);

    const eventInfo = await processImage(imagePath);

    if (eventInfo) {
      console.log('\nExtracted Event Information:');
      console.log(JSON.stringify(eventInfo, null, 2));
      
      try {
        await saveEvent(eventInfo);
        
        // Move processed image to DONE folder
        const doneFolder = path.join(config.imageFolder, 'DONE');
        if (!fs.existsSync(doneFolder)) {
          fs.mkdirSync(doneFolder);
        }
        
        const newPath = path.join(doneFolder, imageFile);
        fs.renameSync(imagePath, newPath);
        console.log(`Moved processed image to ${newPath}`);
      } catch (error) {
        console.error('Failed to save event or move image:', error);
      }
    } else {
      console.log('Failed to extract information from this image.');
    }
  }

  console.log('\nImage processing completed.');
}