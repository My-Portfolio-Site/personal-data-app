import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Chatter',
  description: 'AI chat application',
}

import { PageHeader, PageContent } from "@/components/page-formatter";
import ChatInterface from '@/app/(ai)/chatter/chat/[chatId]/_components/chat-interface'
import { loadChat } from '@/server/ai/chat-store-db';
import { getUser } from '@/lib/dal';
import { User } from '@/schemas/user';
import { ChatSchemaType } from '@/schemas/chat';
import { UIMessage } from 'ai';
import NewChatButton from '@/app/(ai)/chatter/chat/[chatId]/_components/new-chat-button';


export default async function Chatter(props: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await props.params; // get the chat ID from the URL
  const chat = await loadChat(chatId) as ChatSchemaType

  const messages = JSON.parse(chat?.messages) as UIMessage[]
  const messageCount = chat?.messagesCount / 2 || 0;
  console.log("Message count:", messageCount);


  const currentUser = await getUser() as User

  return (
    <section className='min-h-full'>
      <PageHeader title="Chatter">
        <NewChatButton />
      </PageHeader>
      <PageContent className='my-3 md:my-1'>
        <ChatInterface id={chatId} initialMessages={messages} currentUser={currentUser} />
      </PageContent>
    </section>
  );
}
