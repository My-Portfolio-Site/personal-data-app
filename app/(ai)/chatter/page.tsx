import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Chatter',
  description: 'AI chat application',
}

import { PageHeader, PageContent } from "@/components/page-formatter";
import ChatInterface from '@/app/(ai)/chatter/_components/chat-interface'

export default function Chatter() {
  return (
    <section className='min-h-full'>
      <PageHeader title="Chatter" />
      <PageContent>
       <ChatInterface />
      </PageContent>
    </section>
  );
}
