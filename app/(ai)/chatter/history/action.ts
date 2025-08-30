'use server'

import type { ChatSchemaType } from '@/schemas/chat'
import { fetchApi } from '@/lib/helpers'
import { revalidatePath } from 'next/cache'

//==============================Experience=====================================//
// Fetch all experience
export async function fetchChatHistory() {
  try {
    const response = await fetchApi('/chat-history', 'GET')

    if (!response.ok) {
      console.log('Action: Failed to fetch chat history,', 'status:', response.status)
      throw new Error('Failed to fetch chat history')
    }
    const responseData = await response.json() as ChatSchemaType[];
    return { success: true, data: responseData } as ActionResponse<ChatSchemaType[]>;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}

export async function deleteChat(chatId: string) {
  try {
    const response = await fetchApi(`/chat-history?chatId=${chatId}`, 'DELETE')

    if (!response.ok) {
      console.log('Action: Failed to delete chat,', 'status:', response.status)
      throw new Error('Failed to delete chat')
    }
    revalidatePath('/chatter/history')
    return { success: true } as ActionResponse;
  } catch (err) {
    return { message: (err as Error).message, success: false } as ActionResponse;
  }
}