import { redirect } from 'next/navigation';
import { generateId } from 'ai';

export default async function Page() {
  const id = generateId(); // generate a new chat ID without creating in DB
  redirect(`/chatter/chat/${id}`); // redirect to chat page, see below
}