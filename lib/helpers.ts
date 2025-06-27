import { auth } from '@/lib/auth'
import { User } from '@/schemas/user';

export function getCurrentUrl(headers: Headers) {
  const protocol = headers.get("x-forwarded-proto") || "https";
  const host = headers.get("host") || headers.get("x-forwarded-host") || "localhost";
  console.log(protocol, host)

  return `${protocol}://${host}`;
}

export async function getCurrentUserId(): Promise<string> {
  const currentUserSession = await auth();
  if (!currentUserSession?.user?.id) {
    console.warn("User not authenticated, using default id: ", "b1612ca5-1403-45ee-9cef-c5af8a909c81");
    return 'b1612ca5-1403-45ee-9cef-c5af8a909c81'; // Default email for unauthenticated users
  }
  return currentUserSession.user.id;
}

export async function getCurrentUser(): Promise<User | null> {
  const currentUserSession = await auth();
  if (!currentUserSession?.user) {
    return null;
  }

  return currentUserSession.user as User;
}