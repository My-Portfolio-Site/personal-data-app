import 'server-only';

import { auth } from '@/lib/auth'
import { User } from '@/schemas/user';
import { db } from './db';
import { cookies, headers } from 'next/headers'
import { getCurrentUserId } from '@/lib/dal';

export function getCurrentUrl(headers: Headers) {
  const protocol = headers.get("x-forwarded-proto") || "https";
  const host = headers.get("host") || headers.get("x-forwarded-host") || "localhost";
  console.log(protocol, host)

  return `${protocol}://${host}`;
}

export async function fetchApi<T = never>(
  route: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: T
) {
  const baseUrl = getCurrentUrl(await headers());
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  if (data && method !== 'GET') {
    const body = JSON.stringify(data);
    const response = await fetch(`${baseUrl}/api${route}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader
      },
      body: body
    });
    return response;
  } else {
    const response = await fetch(`${baseUrl}/api${route}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader
      }
    });
    return response;
  }

}
