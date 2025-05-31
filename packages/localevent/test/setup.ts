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

function validateTestDatabase() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is missing');
  }
  
  if (!dbUrl.includes('_test')) {
    throw new Error(
      'Test suite can only run against databases with "_test" in their name.\n' +
      'This is a safety measure to prevent accidental use of production databases.\n' +
      'Current DATABASE_URL: ' + dbUrl
    );
  }
}

// Load test environment variables
beforeAll(() => {
  // First check any existing DATABASE_URL
  validateTestDatabase();

  console.log('Loading test environment variables...');
  const envPath = resolve(__dirname, '../.env.test');
  console.log('Looking for .env.test at:', envPath);

  if (!existsSync(envPath)) {
    throw new Error(
      `Could not find .env.test file at ${envPath}.\n` +
      'Please create this file with your test environment variables.'
    );
  }

  // First check DATABASE_URL from any source (process.env has priority)
  let dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is missing');
  }
  
  if (!dbUrl.includes('_test')) {
    throw new Error(
      'Test suite can only run against databases with "_test" in their name.\n' +
      'This is a safety measure to prevent accidental use of production databases.\n' +
      'Current DATABASE_URL: ' + dbUrl
    );
  }

  // Load .env.test file from the server package directory
  const result = config({
    path: envPath,
    override: false // Don't override existing env vars
  });

  console.log('Dotenv result:', result);

  if (!result.parsed) {
    throw new Error(
      'Failed to parse .env.test file.\n' +
      'Make sure the file exists and is properly formatted.\n' +
      'See .gitignore for the example format.'
    );
  }

  // Revalidate DATABASE_URL after loading .env.test
  dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is missing');
  }
  
  if (!dbUrl.includes('_test')) {
    throw new Error(
      'Test suite can only run against databases with "_test" in their name.\n' +
      'This is a safety measure to prevent accidental use of production databases.\n' +
      'Current DATABASE_URL: ' + dbUrl
    );
  }

  // Validate other required environment variables
  // validateEnvVar('SNCF_API_KEY');
  // validateEnvVar('TEST_SNCF_FROM_STATION_ID');
  // validateEnvVar('TEST_SNCF_TO_STATION_ID');
});