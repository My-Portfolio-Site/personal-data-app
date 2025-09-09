import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Chat History',
  description: 'AI chat application',
}

import { PageHeader, PageContent } from "@/components/page-formatter";
import { ChatSchemaType } from '@/schemas/chat';
import { ChatHistorySection } from '@/app/(ai)/chatter/history/_components/chat-history-section';
import { fetchChatHistory } from '@/app/(ai)/chatter/history/actions';

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
