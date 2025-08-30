import Link from 'next/link'
import { ChatSchemaType } from '@/schemas/chat'
import { Button } from '@/components/ui/button'
import ChatDeleteButton from '@/app/(ai)/chatter/history/_components/chat-delete-button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLink } from 'lucide-react'
import NoChatHistoryCard from './no-chat-history-card'

const ChatHistorySection = ({ chatMessages }: { chatMessages: ChatSchemaType[] }) => {
  if(chatMessages.length === 0) {
    return(
      <div className='flex gap-3 p-3 w-full justify-center h-full'>
        <NoChatHistoryCard />
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-3 p-3 w-full items-center'>
      {chatMessages.map((chat) => (
        <Card className="w-full max-w-lg" key={chat.id}>
          <CardHeader>
            <CardTitle>{chat.title || 'New Chat'}</CardTitle>
            <CardDescription>
            </CardDescription>
            <CardAction className='flex gap-2'>
              <Link href={`/chatter/chat/${chat.id}`}>
                <Button size="icon" className="size-8">
                  <ExternalLink/>
                </Button>
              </Link>
              <ChatDeleteButton chatId={chat.id} chatTitle={chat.title || 'New Chat'} />
            </CardAction>
          </CardHeader>
          <CardContent>
            {chat.summary}
          </CardContent>
          <CardFooter>
            <div className='text-sm text-muted-foreground'>
              {chat.createdAt.toLocaleString()}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}


export { ChatHistorySection }