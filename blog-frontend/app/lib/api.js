'use server'
import { cookies } from 'next/headers';

export async function authenticatedRequest(url, options = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Check for renewed token in response headers
  const newToken = response.headers.get('X-New-Token');
  if (newToken) {
    cookieStore.set('token', newToken, {
      httpOnly: true,
      secure: true, // Always use secure in production
      sameSite: 'lax', // Changed from 'strict' to 'lax'
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/', // Explicitly set path
    });
  }

  // Token Expiration Logic
  if (response.status === 401) {
    cookieStore.delete('token');
    return { unauthorized: true, data: response }
  }

  return { unauthorized: false, data: response };
}
