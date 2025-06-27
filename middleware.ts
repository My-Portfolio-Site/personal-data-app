
import { auth } from "@/lib/auth"
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default auth( async (req) => {
  const publicPaths = ['/api/auth', '/login', '/api/acceptinvite']
  const adminPaths = ['/admin']
  const session = req.auth
  const ctx = await getCloudflareContext({ async: true });
  console.log('Request url:', req.nextUrl.pathname);

  const reqUrl = req.nextUrl.pathname;
  // req.headers.set('x-forwarded-proto', 'https')
  if (publicPaths.includes(reqUrl) || reqUrl.startsWith('/api')) {
    return;
  }
  console.log('Middleware Session:', session);


  if (!session?.user?.id) {
    return new Response(
      JSON.stringify({ error: "Unauthorized access. Please log in." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const userId = session.user.id;
  console.log(ctx.env.NEXTJS_ENV);
  
  
  const { success } = await ctx.env.MY_RATE_LIMITER.limit({key: userId});
  if (!success) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded" }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
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
