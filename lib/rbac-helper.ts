import { User } from "@/schemas/user";

type Route = {
  path: string;
  authorizedRoles: string[];
};

export const routes: Route[] = [
  {
    path: '/admin',
    authorizedRoles: ['admin'],
  },
  {
    path: '/dashboard',
    authorizedRoles: ['admin', 'user'],
  },
  {
    path: '/profile',
    authorizedRoles: ['admin', 'user'],
  },
  {
    path: '/public',
    authorizedRoles: ['*'],
  },
];

export function isAuthorized(user: User) {
  if (user.userVerified != true) {
    return false;
  }

  if (user.role !== "admin") {
    return false;
  }
  return true;
}