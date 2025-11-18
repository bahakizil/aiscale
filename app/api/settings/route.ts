import { NextResponse } from 'next/server';
import { getPublicSettings } from '@/lib/settings';

// GET - Fetch public settings (no auth required)
export async function GET() {
  try {
    const settings = await getPublicSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching public settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}
