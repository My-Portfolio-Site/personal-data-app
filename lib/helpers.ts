import 'server-only';

import { auth } from '@/lib/auth'
import { User } from '@/schemas/user';
import { db } from './db';

export function getCurrentUrl(headers: Headers) {
  const protocol = headers.get("x-forwarded-proto") || "https";
  const host = headers.get("host") || headers.get("x-forwarded-host") || "localhost";
  console.log(protocol, host)

  return `${protocol}://${host}`;
}

export async function getCurrentUserId(): Promise<{ currentUserId: string; currentUserEmail: string }> {
  const currentUserSession = await auth();
  // if (!currentUserSession?.user?.id && !currentUserSession?.user?.email) {
  //   console.warn("User not authenticated, using default id: ", "b1612ca5-1403-45ee-9cef-c5af8a909c81");
  //   return {currentUserId: 'b1612ca5-1403-45ee-9cef-c5af8a909c81', currentUserEmail: 'mnkesu1998@gmail.com'}; // Default currentUserEmail for unauthenticated users
  // }
  return { currentUserId: currentUserSession?.user?.id || "", currentUserEmail: currentUserSession?.user?.email || "" };
}

async function createUserWithProfile(user: User): Promise<User> {
  // Here you would typically create a user in your database
  // For now, we just return the user object
  console.log("Creating user with profile:", user);
  
  return user;
}

export async function checkInvitation(user: User) : Promise<boolean> {
  const result = await db.prepare(`
    SELECT * FROM "invites" 
    WHERE email = ? AND expiresAt > ?;
  `).bind(user.email, Math.floor(Date.now() / 1000)).first();

  return result ? true : false;
}
