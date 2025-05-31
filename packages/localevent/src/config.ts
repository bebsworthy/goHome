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

// Load configuration from environment variables
const config = {
  openAI: {
    apiUrl: process.env.OPENAI_API_ENDPOINT || '',
    apiKey: process.env.OPENAI_API_KEY,
  },
  // Image processing configuration
  imageFolder: process.env.EVENT_IMAGE_FOLDER || 'INPUT',
  imagePath: (filename?: string) => {
    const basePath = path.isAbsolute(config.imageFolder) 
      ? config.imageFolder 
      : join(process.cwd(), config.imageFolder);
    return filename ? join(basePath, filename) : basePath;
  },
  donePath: (filename?: string) => {
    const basePath = path.isAbsolute(config.imageFolder) 
      ? config.imageFolder 
      : join(process.cwd(), config.imageFolder);
    const donePath = join(basePath, 'DONE');
    return filename ? join(donePath, filename) : donePath;
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
