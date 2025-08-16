import { redirect } from 'next/navigation';
// import { createChat } from '@/lib/ai/chat-store';
import { createChat } from '@/lib/ai/chat-store-db';
import { generateId } from 'ai';

export default async function Page() {
  const id = await createChat(); // create a new chat
  redirect(`/chatter/chat/${id}`); // redirect to chat page, see below
}