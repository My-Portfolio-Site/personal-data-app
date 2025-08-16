import Link from 'next/link'
import { ChatSchemaType } from '@/schemas/chat'
import { Button } from '@/components/ui/button'

const ChatHistorySection = ({ chatMessages }: { chatMessages: ChatSchemaType[] }) => {
  return (
    <div className='flex flex-col gap-2 p-3'>
      {chatMessages.map((chat) => (
        <div key={chat.id} className='bg-card rounded-md'>
          <div className='m-2 flex flex-row gap-3'>
            <div>{chat.title || 'New Chat'}</div>
            <Link href={`/chatter/chat/${chat.id}`}>
              <Button>Open</Button>
            </Link>
          </div>
          <div>{chat.summary}</div>
        </div>
      ))}
    </div>
  )
}


export { ChatHistorySection }