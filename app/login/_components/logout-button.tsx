import { signOut } from "@/lib/auth";
 
export  default function SignOut() {
  return (
    <form 
      action={async () => {
        'use server'
        await signOut({redirectTo: '/login'})
      }}
    >
      <button className="bg-amber-600 text-white px-4 py-2 rounded" type="submit">Sign Out</button>
    </form>
  )
}