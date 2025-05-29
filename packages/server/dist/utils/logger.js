import fs from 'fs';
import path from 'path';
/**
 * Ensures a directory exists, creating it if necessary
 */
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}
/**
 * Creates a markdown log file for an API call
 * @param folder The folder to store the log in (relative to logs/)
 * @param url The API URL that was called
 * @param response The API response data
 */
export async function logApiCall(folder, url, response) {
    try {
        // Create logs directory if it doesn't exist
        const logsDir = path.resolve(process.cwd(), 'logs', folder);
        ensureDirectoryExists(logsDir);
        // Generate filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = path.join(logsDir, `${timestamp}.md`);
        // Create markdown content
        const content = `# API Call Log

## Request
\`\`\`
${url}
\`\`\`

## Response
\`\`\`json
${JSON.stringify(response, null, 2)}
\`\`\`
`;
        // Write to file
        await fs.promises.writeFile(filename, content, 'utf8');
        console.log(`[Logger] API call logged to ${filename}`);
    }
    catch (error) {
        console.error('[Logger] Error writing log file:', error);
    }
}
//# sourceMappingURL=logger.js.map