'use client'
import { SquarePen } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NewChatButton({isFull=false}: {isFull?: boolean}) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/chatter/chat');
  };

  return (
    <Button size="sm" onClick={handleClick}>
      <SquarePen className='' />
      {isFull ? 'New Chat' : ''}
    </Button>
  )
}
