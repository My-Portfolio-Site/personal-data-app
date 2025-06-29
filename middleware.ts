
import { auth } from "@/lib/auth"
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default auth(async (req) => {
  const publicPaths = ['/api/auth', '/login', '/api/acceptinvite']
  const adminPaths = ['/admin']
  const session = req.auth
  const ctx = await getCloudflareContext({ async: true });
  const reqUrl = req.nextUrl.pathname;

  if (reqUrl.startsWith('/api')) {
    console.log('=== MIDDLEWARE DEBUG ===');
    console.log('URL:', reqUrl);
    console.log('Session exists:', !!session);
    console.log('Session user:', session?.user?.id);
    console.log('Cookies:', Object.fromEntries(req.cookies));
    console.log('Headers:', Object.fromEntries(req.headers.entries()));
    console.log('========================');
  }
  if (publicPaths.includes(reqUrl) || reqUrl.startsWith('/api/auth')) {
    return;
  }

  console.log('Middleware Session:', session);


  if (!session?.user?.id) {
    if (reqUrl.startsWith('/api')) {
      return new Response(
        JSON.stringify({ error: "Unauthorized access. Please log in." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    // Capture the full URL (pathname + search params) for redirect after login
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
    const newUrl = new URL(`/login?callbackUrl=${callbackUrl}`, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  const userId = session.user.id;
  const { success } = await ctx.env.MY_RATE_LIMITER.limit({ key: userId });
  if (!success) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded" }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // "/api/(.*)",
  ],
}
