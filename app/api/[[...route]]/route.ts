import { Hono } from 'hono'
import { handle } from 'hono/vercel'


// const app = new Hono<{ Bindings: CloudflareEnv, Variables: Bindings }>().basePath('/api');
const app = new Hono<{Bindings: CloudflareEnv}>().basePath('/api');

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
    // environment: env<CloudflareEnv>(c).TEST_VAR,
    testVar: c.env.TEST_VAR,
  })
})

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)
export const HEAD = handle(app)
export const OPTIONS = handle(app)
export const ALL = handle(app)
// export default app as never