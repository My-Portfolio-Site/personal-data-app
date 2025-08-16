import { redirect } from 'next/navigation';

export default async function Page() {
  redirect('/chatter/chat/history'); 
}