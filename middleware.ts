
import { auth } from "@/lib/auth"
import { User } from "@/schemas/user";

export default auth((req) => {
  const publicPaths = ['/api/auth', '/login', '/api/acceptinvite']
  const adminPaths = ['/admin']
  const session = req.auth
  console.log('Request url:', req.nextUrl.pathname);
  const reqUrl = req.nextUrl.pathname;
  if (publicPaths.includes(reqUrl) || reqUrl.startsWith('/api/auth')) {
    return;
  }
  console.log('Middleware Session:', session);
  return
  if (!session) {
    if (reqUrl.startsWith("/api")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized access. Please log in." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    if (reqUrl !== "/login") {
      const newUrl = new URL("/login", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
  return
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/api/(.*)",
  ],
}