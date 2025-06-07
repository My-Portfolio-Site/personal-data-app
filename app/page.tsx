
import { context } from "@/lib/context"

export default function Home() {
  return (
    <section className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h2 className='p-3'>Personal Data App</h2>
      <p className='p-3'>This app is running on Cloudflare Workers.</p>
      <h4 className='p-3'>Environment: {context.env.NEXTJS_ENV}</h4>
    </section>
  )
}
