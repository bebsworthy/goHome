import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import { saveEvent } from './api_client.js';
import config, { validateConfig } from '../config.js';
import { ImageStatus } from '../types.js';
import { getDirectoryByStatus } from '../image-api.js';
// Validate configuration on startup
validateConfig();
const MODEL = 'gemma3';
const PROMPT = `Please analyze this image and extract the following event information:
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

  Please format the response as a JSON object with these fields.`;
// Initialize OpenAI client
const openai = new OpenAI({
    baseURL: config.openAI.apiUrl,
    apiKey: config.openAI.apiKey
});
// Function to check if a file is an image
const isImage = (filename) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return imageExtensions.includes(path.extname(filename).toLowerCase());
};
// Function to get all image files from a directory
const getImageFiles = (directory) => {
    try {
        const files = fs.readdirSync(directory);
        return files.filter(file => isImage(file));
    }
    catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
};
// Function to process an image with OpenAI Vision
export async function processImage(imagePath) {
    try {
        const imageData = await fs.promises.readFile(imagePath);
        const base64Image = imageData.toString('base64');
        const response = await openai.chat.completions.create({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: PROMPT
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
        return JSON.parse(content);
    }
    catch (error) {
        console.error(`Error processing image ${imagePath}:`, error);
        return null;
    }
}
export async function moveImageToStatusFolder(imagePath, status, metadata) {
    const statusFolder = getDirectoryByStatus(status);
    if (!fs.existsSync(statusFolder)) {
        fs.mkdirSync(statusFolder, { recursive: true });
    }
    const imageName = path.basename(imagePath);
    // TODO: rename image to something unique to avoid conflicts
    // For now, we just keep the original name, but this should be improved
    // e.g. by changing to a timestamp or a UUID
    const newImageName = imageName;
    const newPath = path.join(statusFolder, newImageName);
    try {
        fs.renameSync(imagePath, newPath);
        fs.writeFileSync(newPath + '.metadata.json', JSON.stringify(metadata || {}, null, 2));
        console.log(`Moved image ${newImageName} to ${status} folder.`);
        return path.relative(config.imageFolder, newPath);
    }
    catch (error) {
        console.error(`Failed to move image ${newImageName} to ${status} folder:`, error);
        throw error;
    }
}
const fixTimeFormat = (time, def) => {
    if (!time || time.trim() === '') {
        return def;
    }
    if (!/^\d{2}:\d{2}$/.test(time)) {
        // extract hours and minutes from startTime
        const match = time.trim().match(/^(\d{1,2}).(\d{2})/);
        if (match) {
            const hours = match[1].padStart(2, '0');
            const minutes = match[2].padStart(2, '0');
            return `${hours}:${minutes}`;
        }
    }
    else {
        return time.trim();
    }
    return def;
};
const fixPhoneFormat = (phone) => {
    if (!phone || phone.trim() === '') {
        return undefined;
    }
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Check if the cleaned phone number is valid
    if (cleaned.length < 10 || cleaned.length > 15) {
        console.warn(`Invalid phone number format: ${phone}`);
        return undefined;
    }
    return cleaned;
};
const fixEmailFormat = (email) => {
    if (!email || email.trim() === '') {
        return undefined;
    }
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.warn(`Invalid email format: ${email}`);
        return undefined;
    }
    return email.trim();
};
export function fixEventInfo(eventInfo) {
    return {
        ...eventInfo,
        startTime: fixTimeFormat(eventInfo.startTime),
        endTime: fixTimeFormat(eventInfo.endTime),
        location: eventInfo.location?.trim() || '',
        dates: eventInfo.dates?.map(date => date.trim()),
        city: eventInfo.city?.trim() || undefined,
        description: eventInfo.description?.trim() || undefined,
        organizer: eventInfo.organizer?.trim() || undefined,
        price: eventInfo.price?.trim() || undefined,
        category: eventInfo.category?.trim() || undefined,
        email: fixEmailFormat(eventInfo.email),
        phone: fixPhoneFormat(eventInfo.phone),
        rawText: eventInfo.rawText?.trim() || undefined,
    };
}
// Main function to process all images in the directory
export async function processImagesDirectory() {
    console.log('Starting image processing...');
    console.log(`Looking for images in: ${config.imageInputPath("")}`);
    const imageFiles = getImageFiles(config.imageInputPath(""));
    if (imageFiles.length === 0) {
        console.log('No image files found in the specified directory.');
        return;
    }
    const makeImageProcessingInfo = (data, dbId, error) => ({
        date: new Date().toISOString(),
        source: 'image_converter',
        model: MODEL,
        prompt: PROMPT,
        dbId,
        data,
        error: error ? JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) : null
    });
    console.log(`Found ${imageFiles.length} image(s) to process.`);
    for (const imageFile of imageFiles) {
        const imagePath = config.imageInputPath(imageFile);
        console.log(`\nProcessing: ${imageFile}`);
        let eventInfo = null;
        try {
            eventInfo = await processImage(imagePath);
            if (eventInfo) {
                console.log('\nExtracted Event Information:');
                console.log(JSON.stringify(eventInfo, null, 2));
                const fixedEventInfo = fixEventInfo(eventInfo);
                console.log('\nEnriched Event Information:');
                console.log(JSON.stringify(fixedEventInfo, null, 2));
                const result = await saveEvent(fixedEventInfo);
                const newImagePath = await moveImageToStatusFolder(imagePath, ImageStatus.DONE, makeImageProcessingInfo(eventInfo, result.id));
                console.log(`Image moved to ${newImagePath}`);
            }
            else {
                throw new Error('Model failed to extract information from the image.');
            }
        }
        catch (error) {
            console.error('Failed to save event', error);
            moveImageToStatusFolder(imagePath, ImageStatus.FAILED, makeImageProcessingInfo(eventInfo, '', error));
        }
    }
    console.log('\nImage processing completed.');
}
