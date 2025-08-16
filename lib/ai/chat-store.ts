import 'server-only'

import { generateId } from 'ai';
import { UIMessage } from 'ai';

import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import { readFile } from 'fs/promises';
import { db } from "@/lib/db";


export async function createChat(): Promise<string> {
  const id = generateId(); // generate a unique chat ID

  await writeFile(getChatFile(id), '[]'); // create an empty chat file
  return id;
}

function getChatFile(id: string): string {
  const chatDir = path.join(process.cwd(), '.chats');
  if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
  return path.join(chatDir, `${id}.json`);
}

export async function loadChat(id: string): Promise<UIMessage[]> {
  const messages = await readFile(getChatFile(id), 'utf8')
  // console.log("MSGs:", messages);

  return JSON.parse(messages);
}

export async function saveChat({
  chatId,
  messages,
}: {
  chatId: string;
  messages: UIMessage[];
}): Promise<void> {
  const content = JSON.stringify(messages, null, 2);
  await writeFile(getChatFile(chatId), content);
}