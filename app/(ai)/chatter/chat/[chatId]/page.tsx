import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Chatter',
  description: 'AI chat application',
}

import { PageHeader, PageContent } from "@/components/page-formatter";
import ChatInterface from '@/app/(ai)/chatter/chat/[chatId]/_components/chat-interface'
import { loadChat } from '@/lib/ai/chat-store-db';
import { getUser } from '@/lib/dal';
import { User } from '@/schemas/user';
import { ChatSchemaType } from '@/schemas/chat';
import { UIMessage } from 'ai';

export default async function Chatter(props: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await props.params; // get the chat ID from the URL
  const chat = await loadChat(chatId) as ChatSchemaType

  const messages = JSON.parse(chat.messages) as UIMessage[]
  console.log("Load messages:", messages);
  // console.log("Load messages:", JSON.parse(messages));

  const currentUser = await getUser() as User

  return (
    <section className='min-h-full'>
      <PageHeader title="Chatter" />
      <PageContent className='my-3 md:my-1'>
        <ChatInterface id={chatId} initialMessages={messages} currentUser={currentUser} />
      </PageContent>
    </section>
  );
}
