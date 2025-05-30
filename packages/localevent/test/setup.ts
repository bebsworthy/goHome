import { config } from 'dotenv';
import { resolve } from 'path';
import { beforeAll } from 'vitest';
import { existsSync } from 'fs';

function validateEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Required test environment variable "${name}" is missing.\n` +
      'Create a .env.test file in the server package directory with the required variables.\n' +
      'See .gitignore for the example format.'
    );
  }
  return value;
}

// Load test environment variables
beforeAll(() => {
  console.log('Loading test environment variables...');
  const envPath = resolve(__dirname, '../.env.test');
  console.log('Looking for .env.test at:', envPath);

  if (!existsSync(envPath)) {
    throw new Error(
      `Could not find .env.test file at ${envPath}.\n` +
      'Please create this file with your test environment variables.'
    );
  }

  // Load .env.test file from the server package directory
  const result = config({
    path: envPath,
    override: true // Override any existing env vars
  });

  console.log('Dotenv result:', result);
  // console.log('Current working directory:', process.cwd());
  // console.log('Current environment:', {
  //   SNCF_API_KEY: process.env.SNCF_API_KEY ? '[REDACTED]' : undefined,
  //   TEST_SNCF_FROM_STATION_ID: process.env.TEST_SNCF_FROM_STATION_ID,
  //   TEST_SNCF_TO_STATION_ID: process.env.TEST_SNCF_TO_STATION_ID
  // });

  if (!result.parsed) {
    throw new Error(
      'Failed to parse .env.test file.\n' +
      'Make sure the file exists and is properly formatted.\n' +
      'See .gitignore for the example format.'
    );
  }

  // Validate required environment variables
  // validateEnvVar('SNCF_API_KEY');
  // validateEnvVar('TEST_SNCF_FROM_STATION_ID');
  // validateEnvVar('TEST_SNCF_TO_STATION_ID');
}); 