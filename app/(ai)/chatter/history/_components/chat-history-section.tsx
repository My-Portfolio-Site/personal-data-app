import Link from 'next/link'
import { ChatSchemaType } from '@/schemas/chat'
import { Button } from '@/components/ui/button'

const ChatHistorySection = ({ chatMessages }: { chatMessages: ChatSchemaType[] }) => {
  return (
    <div className='flex flex-col gap-3 p-3 max-w-fit'>
      {chatMessages.map((chat) => (
        <div key={chat.id} className='bg-card rounded-md px-4 py-3 shadow-2xs border-1 max-w-full'>
          <div className='m-2 flex flex-row justify-between gap-3'>
            <div>{chat.title || 'New Chat'}</div>
            <Link href={`/chatter/chat/${chat.id}`}>
              <Button>Open</Button>
            </Link>
          </div>
          <p className='line-clamp-2 text-muted-foreground max-w-md'>{chat.summary}</p>
        </div>
      ))}
    </div>
  )
}


export { ChatHistorySection }