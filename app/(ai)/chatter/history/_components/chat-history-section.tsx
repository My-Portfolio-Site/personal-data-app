import Link from 'next/link'
import { ChatSchemaType } from '@/schemas/chat'
import { Button } from '@/components/ui/button'

const ChatHistorySection = ({ chatMessages }: { chatMessages: ChatSchemaType[] }) => {
  return (
    <div className='flex flex-col gap-3 p-3'>
      {chatMessages.map((chat) => (
        <div key={chat.id} className='bg-card rounded-md px-4 py-3 shadow-2xs border-1'>
          <div className='m-2 flex flex-row justify-between gap-3'>
            <div>{chat.title || 'New Chat'}</div>
            <Link href={`/chatter/chat/${chat.id}`}>
              <Button>Open</Button>
            </Link>
          </div>
          <div className='line-clamp-2 overflow-hidden text-muted-foreground'>{chat.summary}</div>
        </div>
      ))}
    </div>
  )
}


export { ChatHistorySection }