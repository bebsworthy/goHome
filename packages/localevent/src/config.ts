// Load environment variables
import dotenv from 'dotenv';
import path, { join, isAbsolute } from 'path';
dotenv.config();

// Configuration interface
export interface Config {
  openApiUrl: string;
  imageFolder: string;
  apiKey?: string;
}

const DONE = 'DONE';
const FAILED = 'FAILED';
const INPUT = 'INPUT';

// Load configuration from environment variables
const config = {
  openAI: {
    apiUrl: process.env.OPENAI_API_ENDPOINT || '',
    apiKey: process.env.OPENAI_API_KEY,
  },
  // Image processing configuration
  imageFolder: process.env.EVENT_IMAGE_FOLDER || 'IMAGES',
  imageFolderPath: () => {
    return path.isAbsolute(config.imageFolder) 
      ? config.imageFolder 
      : join(process.cwd(), config.imageFolder);
  },
  imageInputPath: (filename: string) => {
    return join(config.imageFolderPath(), INPUT, filename);
  },
  imageDonePath: (filename: string) => {
    return join(config.imageFolderPath(), DONE, filename);
  },
  imageFailedPath: (filename: string) => {
    return join(config.imageFolderPath(), FAILED, filename);
  }
};

// Validate required configuration
export function validateConfig() {
  const missingVars = [];
  
  if (!config.imageFolder) missingVars.push('EVENT_IMAGE_FOLDER');
  if (!config.openAI.apiKey) missingVars.push('OPENAI_API_KEY');
  
  if (missingVars.length > 0) {
    console.error('Error: Required environment variables are not set.');
    console.error(`Please set: ${missingVars.join(', ')}`);
    process.exit(1);
  }
}

export default config;
