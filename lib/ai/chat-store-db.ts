import 'server-only'

import { generateId } from 'ai';
import { UIMessage } from 'ai';

import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/dal";
import { ChatSchemaType } from '@/schemas/chat';

import { getChatSummary } from '@/lib/ai/ai-helpers';


export async function createChat(): Promise<string> {
  const chatId = generateId(); // generate a unique chat ID

  const currentUserId = await getCurrentUserId();
  // Insert the new experience into the database
  const query = `
      INSERT INTO "chat_history" ("id", "userId", "title", "summary", "messages")
      VALUES (?, ?, ?, ?, ?);
    `;
  await db.prepare(query).bind(chatId, currentUserId, '', '', '[]').run();
  return chatId;
}

export async function loadChat(chatId: string): Promise<ChatSchemaType | null> {
  const currentUserId = await getCurrentUserId();

  const query = `SELECT * FROM chat_history WHERE "id" = ? AND "userId" = ?;`;
  const result = await db.prepare(query).bind(chatId, currentUserId).first<ChatSchemaType>();
  
  return result;
}

export async function saveChat({
  chatId,
  messages,
}: {
  chatId: string;
  messages: UIMessage[];
}): Promise<void> {
  const currentUserId = await getCurrentUserId();

  const chatTitle = messages[0].parts.find(part => part.type === 'text')?.text
  const chatSummary = await getChatSummary(messages)

  const query = `
    UPDATE "chat_history"
    SET
    "title" = COALESCE(?, "title"),
    "summary" = COALESCE(?, "summary"),
    "messages" = COALESCE(?, "messages")
    WHERE "id" = ? AND "userId" = ?;
  `;
  await db.prepare(query).bind(chatTitle, chatSummary, JSON.stringify(messages), chatId, currentUserId).run();
}




// export async function saveChat({
//   chatId,
//   message,
// }: {
//   chatId: string;
//   message: UIMessage;
// }): Promise<void> {
//   const currentUserId = await getCurrentUserId();
//   if (!message.id) {
//     message.id = generateId();
//   }

//   const messageString = JSON.stringify(message);
//   console.log("Save msg str:", messageString);

//   const query = `
//     UPDATE "chat_history"
//     SET
//     "title" = COALESCE(?, "title"),
//     "summary" = COALESCE(?, "summary"),
//     messages = json_insert(messages, '$[#]', ?)
//     WHERE "id" = ? AND "userId" = ?;
//   `;
//   await db.prepare(query).bind('', '', messageString, chatId, currentUserId).run();
// }