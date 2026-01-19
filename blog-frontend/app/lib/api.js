'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    redirect('/login');
  }

  return response;
}
