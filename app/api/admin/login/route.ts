import { NextRequest, NextResponse } from 'next/server';
import { validateAdminLogin, setAdminSession } from '@/lib/admin-auth';
import { limiter, getIP } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limiting - max 5 login attempts per 15 minutes
  const ip = getIP(request);
  const rateLimitResult = limiter.strict.check(request, 5, `login_${ip}`);
  if (rateLimitResult) {
    return rateLimitResult;
  }

  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const isValid = await validateAdminLogin(username, password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    await setAdminSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
