import SignOut from '@/app/login/_components/logout-button'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (!session) return <div>No session</div>
  if (!session?.user) redirect('/login')
  return (
    <section className='flex flex-col items-center justify-center min-h-screen p-4'>
      <SignOut />
      <h2 className='p-3'>Personal Data App</h2>
      <h2 className='p-3'>Welcome, {session.user?.name}!</h2>
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </section>
  )
}
