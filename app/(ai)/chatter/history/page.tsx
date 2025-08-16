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
import { ChatHistorySection } from '@/app/(ai)/chatter/history/_components/chat-history-section';
import { fetchChatHistory } from '@/app/(ai)/chatter/history/action';

export default async function ChatHistory() {
  const response = await fetchChatHistory()
  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch chat history')
  }


  const chatMessages = response.data as ChatSchemaType[]


  return (
    <section className='min-h-full'>
      <PageHeader title="Chatter" />
      <PageContent className='my-2 md:my-1'>
        <ChatHistorySection chatMessages={chatMessages} />
      </PageContent>
    </section>
  );
}
