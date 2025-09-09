'use client'
import { Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { deleteChat } from '@/app/(ai)/chatter/history/actions';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { toast } from 'sonner';

export default function ChatDeleteButton({ chatId, chatTitle }: { chatId: string; chatTitle: string }) {

  const handleClick = async () => {
    const result = await deleteChat(chatId);
    if (result.success) {
      toast.success(`Chat "${chatTitle}" deleted successfully.`);
    } else {
      toast.error(`Failed to delete chat "${chatTitle}".`);
    }
  };

  return (
    <ConfirmDialog title='Confirm Deletion' description={`Are you sure you want to delete the chat: "${chatTitle}"?`} onConfirm={handleClick} variant='destructive' confirmText='Delete'>
      <Button size="icon" className="size-8 bg-destructive hover:bg-destructive/90">
        <Trash2Icon />
      </Button>
    </ConfirmDialog>
  )
}

