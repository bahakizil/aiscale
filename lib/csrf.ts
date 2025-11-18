import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const CSRF_TOKEN_NAME = 'csrf-token';
const CSRF_HEADER_NAME = 'x-csrf-token';

// Generate a random CSRF token
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Set CSRF token in cookie
export async function setCSRFToken() {
  const token = generateCSRFToken();
  const cookieStore = await cookies();

  cookieStore.set(CSRF_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return token;
}

// Get CSRF token from cookie
export async function getCSRFToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_TOKEN_NAME)?.value;
}

// Validate CSRF token
export async function validateCSRFToken(request: NextRequest): Promise<boolean> {
  // Skip CSRF check for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return true;
  }

  const cookieStore = await cookies();
  const tokenFromCookie = cookieStore.get(CSRF_TOKEN_NAME)?.value;
  const tokenFromHeader = request.headers.get(CSRF_HEADER_NAME);

  if (!tokenFromCookie || !tokenFromHeader) {
    return false;
  }

  return tokenFromCookie === tokenFromHeader;
}

// Middleware to check CSRF token
export async function csrfProtection(request: NextRequest): Promise<NextResponse | null> {
  const isValid = await validateCSRFToken(request);

  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid CSRF token' },
      { status: 403 }
    );
  }

  return null;
}

// Hook to get CSRF token for client-side use
export async function getCSRFTokenForClient(): Promise<string> {
  let token = await getCSRFToken();

  if (!token) {
    token = await setCSRFToken();
  }

  return token;
}
