import { Hono } from 'hono';
import { stat, readdir, readFile } from 'node:fs/promises';
import { join } from 'path';
import config from './config.js';
import { ImageStatus } from './types.js';

const app = new Hono();

interface ImageInfo {
  name: string;
  path: string;
  lastModified: Date;
  size: number;
}

interface ListImagesResponse {
  images: ImageInfo[];
  total: number;
  page: number;
  pageSize: number;
}

async function getImagesFromDirectory(status: ImageStatus, page: number, pageSize: number): Promise<ListImagesResponse> {
  const dir = getDirectoryByStatus(status);
  const files = await readdir(dir);
  const imageFiles = files.filter((file: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

  // Get file stats and create image info objects
  const imagesWithStats = await Promise.all(
    imageFiles.map(async (file: string) => {
      const filePath = join(dir, file);
      const stats = await stat(filePath);
      return {
        name: file,
        path: `/api/local/images/${status}/${file}`,
        lastModified: stats.mtime,
        size: stats.size
      } as ImageInfo;
    })
  );

  // Sort by last modified date, most recent first
  const sortedImages = imagesWithStats.sort((a: ImageInfo, b: ImageInfo) => 
    b.lastModified.getTime() - a.lastModified.getTime()
  );

  // Calculate pagination
  const start = (page - 1) * pageSize;
  const paginatedImages = sortedImages.slice(start, start + pageSize);

  return {
    images: paginatedImages,
    total: imageFiles.length,
    page,
    pageSize
  };
}

function getDirectoryByStatus(status: ImageStatus): string {
  switch (status) {
    case ImageStatus.DONE:
      return config.imageDonePath("");
    case ImageStatus.FAILED:
      return config.imageFailedPath("");
    default: // pending
      return config.imageInputPath("");
  }
}

// List images endpoint
app.get('/images', async (c) => {
  try {
    const status = (c.req.query('status') || ImageStatus.PENDING) as ImageStatus;
    const page = parseInt(c.req.query('page') || '1');
    const pageSize = parseInt(c.req.query('pageSize') || '10');

    const directory = getDirectoryByStatus(status);

    const response = await getImagesFromDirectory(status, page, pageSize);
    return c.json(response);
  } catch (error) {
    console.error('Error listing images:', error);
    return c.json({ error: 'Failed to list images' }, 500);
  }
});

// Serve image files endpoint
app.get('/images/:status/:filename', async (c) => {
  try {
    const filename = c.req.param('filename');
    const status = c.req.param('status') as ImageStatus;
    
    const directory = getDirectoryByStatus(status);
    const filePath = join(directory, filename);
    
    try {
      const fileBuffer = await readFile(filePath);
      const contentType = filename.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
      return new Response(fileBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000',
        },
      });
    } catch (readError) {
      console.error('Error reading image file:', readError);
      return c.json({ error: 'Image file not found' }, 404);
    }
  } catch (error) {
    console.error('Error serving image:', error);
    return c.json({ error: 'Failed to serve image' }, 500);
  }
});

export { app as imageApi };
