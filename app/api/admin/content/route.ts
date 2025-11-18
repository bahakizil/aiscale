import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getWebFunnelContent, saveWebFunnelContent, resetWebFunnelContent } from '@/lib/webfunnel-content';

// GET - Fetch current content
export async function GET() {
  try {
    const content = await getWebFunnelContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// PUT - Update content (requires authentication)
export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated();

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const content = await request.json();
    await saveWebFunnelContent(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}

// POST - Reset to default content (requires authentication)
export async function POST() {
  try {
    const isAuthenticated = await isAdminAuthenticated();

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await resetWebFunnelContent();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error resetting content:', error);
    return NextResponse.json(
      { error: 'Failed to reset content' },
      { status: 500 }
    );
  }
}
