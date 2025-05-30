"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = processImage;
exports.processImagesDirectory = processImagesDirectory;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const openai_1 = __importDefault(require("openai"));
const db_1 = require("./db");
// Load environment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Load configuration from environment variables
const config = {
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
const openai = new openai_1.default({
    baseURL: config.openApiUrl,
    apiKey: config.apiKey
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
async function processImage(imagePath) {
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
                - Title the title of the event as written in the image
                - Date converted to YYYY-MM-DD format, an event is over multiple days this should be an array
                - Time (if available, as written in the image)
                - StartTime (if available, in HH:MM format)
                - EndTime (if available, in HH:MM format)
                - Location (if available, as written in the image)
                - City (if available)
                - Description
                - Organizer (if available)
                - Price (if available)
                - Category (if you can determine it)
                - Email (if available)
                - Phone (if available)
                - Text (all the text that can be extracted from the image a concatenation of all text in the image)
                
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
        return JSON.parse(content);
    }
    catch (error) {
        console.error(`Error processing image ${imagePath}:`, error);
        return null;
    }
}
// Main function to process all images in the directory
async function processImagesDirectory() {
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
                await (0, db_1.saveEvent)(eventInfo);
                // Move processed image to DONE folder
                const doneFolder = path.join(config.imageFolder, 'DONE');
                if (!fs.existsSync(doneFolder)) {
                    fs.mkdirSync(doneFolder);
                }
                const newPath = path.join(doneFolder, imageFile);
                fs.renameSync(imagePath, newPath);
                console.log(`Moved processed image to ${newPath}`);
            }
            catch (error) {
                console.error('Failed to save event or move image:', error);
            }
        }
        else {
            console.log('Failed to extract information from this image.');
        }
    }
    console.log('\nImage processing completed.');
}
