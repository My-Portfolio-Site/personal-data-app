
import { redirect } from 'next/navigation'

export default async function Home() {
redirect('/aboutme')
  return (
    <section className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h2 className='p-3'>Personal Data App</h2>
    </section>
  )
}
