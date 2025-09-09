import 'server-only';

import { cookies, headers } from 'next/headers'
import { getCurrentUserId } from '@/lib/dal';
import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getCurrentUrl(headers: Headers) {
  const protocol = headers.get("x-forwarded-proto") || "https";
  const host = headers.get("host") || headers.get("x-forwarded-host") || "localhost";
  return `${protocol}://${host}`;
}

// encapsulation of js fetch api to pass cookie headers
export async function fetchApi<T = never>(
  route: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: T
) {
  const { env } = await getCloudflareContext({ async: true });
  const currentBaseUrl = getCurrentUrl(await headers());
  const baseUrl = env.BASE_API_URL || currentBaseUrl + "/api";
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  if (data && method !== 'GET') {
    const body = JSON.stringify(data);
    const response = await fetch(`${baseUrl}/${route}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader
      },
      body: body
    });
    return response;
  } else {
    const response = await fetch(`${baseUrl}/${route}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader
      },
    });
    return response;
  }

}
