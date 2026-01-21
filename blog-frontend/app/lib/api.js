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

  // Token Expiration Logic
  if (response.status === 401) {
    cookieStore.delete('token');
    return { unauthorized: true, data: response }
  }

  return { unauthorized: false, data: response };
}
