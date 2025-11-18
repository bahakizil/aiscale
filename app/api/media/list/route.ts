import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'images';

    const mediaDir = join(process.cwd(), 'public', 'media', folder);

    if (!existsSync(mediaDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = await readdir(mediaDir);
    const fileList = await Promise.all(
      files
        .filter((file) => !file.startsWith('.'))
        .map(async (file) => {
          const filepath = join(mediaDir, file);
          const stats = await stat(filepath);
          return {
            name: file,
            url: `/media/${folder}/${file}`,
            size: stats.size,
            createdAt: stats.birthtime.toISOString(),
            modifiedAt: stats.mtime.toISOString(),
          };
        })
    );

    // Sort by creation date (newest first)
    fileList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ files: fileList });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
