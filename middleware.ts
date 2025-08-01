
import { auth } from "@/lib/auth"
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server"
import { User } from "@/schemas/user";

export default auth(async (req) => {
  const publicRoutes = ['/api/auth', '/login', '/error', '/api/acceptinvite']
  const rotectedAdminRoutes = ['/admin']
  const session = req.auth
  const ctx = await getCloudflareContext({ async: true });
  const reqUrl = req.nextUrl.pathname;
  const response = NextResponse.next()
  response.headers.set('x-pathname', req.nextUrl.pathname)

  if (reqUrl.startsWith('/api/auth') || publicRoutes.some(route => reqUrl.startsWith(route))) {
    // Skip authentication for public routes
    console.log('Skipping authentication for public route:', reqUrl);
    return;
  }

  console.log('Middleware: Requested URL=', reqUrl);


  if (!session?.user?.id) {
    console.log('Middleware: Unauthenticated user');
    if (reqUrl.startsWith('/api')) {
      return new Response(
        JSON.stringify({ error: "Unauthenticated API access." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    } else {
      // Capture the full URL (pathname + search params) for redirect after login
      // const callbackUrl = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
      // const newUrl = new URL(`/login?callbackUrl=${callbackUrl}`, req.nextUrl.origin);
      const newUrl = new URL('/login', req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }

  console.log('Middleware: Session=', session?.user?.email);

  if (reqUrl.startsWith('/api')) {
    const currentUser = session.user as User;
    const { success } = await ctx.env.MY_RATE_LIMITER.limit({ key: currentUser.id });
    if (!success) {
      console.log('Middleware: Request rate limit exceeded');
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded" }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
    const userVerified = currentUser.userVerified;
    if (!userVerified) {
      console.log('Middleware: User not verified');

      return new Response(
        JSON.stringify({ error: "User not verified." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  } else {
    const currentUser = session.user as User;
    const userVerified = currentUser.userVerified;
    if (!userVerified) {
      console.log('Middleware: User not verified');
      const newUrl = new URL('/not-verified', req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }

  return response
})
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // "/api/(.*)",
  ],
}
