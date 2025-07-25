
import { auth } from "@/lib/auth"
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { User } from "@/schemas/user"

export default auth(async (req) => {
  const publicRoutes = ['/api/auth', '/login', '/error', '/api/acceptinvite']
  const rotectedAdminRoutes = ['/admin']
  const session = req.auth
  const ctx = await getCloudflareContext({ async: true });
  const reqUrl = req.nextUrl.pathname;

  // if (reqUrl.startsWith('/api')) {
  //   console.log('=== MIDDLEWARE DEBUG ===');
  //   console.log('URL:', reqUrl);
  //   console.log('Session exists:', !!session);
  //   console.log('Session user:', session?.user?.id);
  //   console.log('Cookies:', Object.fromEntries(req.cookies));
  //   console.log('Headers:', Object.fromEntries(req.headers.entries()));
  //   console.log('========================');
  // }
  if (reqUrl.startsWith('/api/auth') || publicRoutes.some(route => reqUrl.startsWith(route))) {
    // Skip authentication for public routes
    console.log('Skipping authentication for public route:', reqUrl);
    return;
  }
  console.log('URL:', reqUrl);
  console.log('Middleware Session:', session?.user?.email);


  if (!session?.user?.id) {
    if (reqUrl.startsWith('/api')) {
      return new Response(
        JSON.stringify({ error: "Unauthenticated API access." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    } else {
      // Capture the full URL (pathname + search params) for redirect after login
      const callbackUrl = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
      const newUrl = new URL(`/login?callbackUrl=${callbackUrl}`, req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }

  if (reqUrl.startsWith('/api')) {
    const userId = session.user.id;
    const { success } = await ctx.env.MY_RATE_LIMITER.limit({ key: userId });
    if (!success) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded" }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // "/api/(.*)",
  ],
}
