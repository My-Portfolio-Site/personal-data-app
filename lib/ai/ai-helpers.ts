import 'server-only'
import { UIMessage } from 'ai';

import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getChatSummary( messages: UIMessage[]): Promise<string | undefined> {
  const {env} = await getCloudflareContext({ async: true });
  const prompt = `
    You are an assistant tasked with summarizing a chat history in a way that preserves **all important context, decisions, action items, and relationships between messages**.
    Requirements:
    1. Keep the summary **concise** but **contextually complete** so it can be used later in place of the original chat.
    2. Maintain clarity on **who said what** whenever relevant.
    3. Avoid minor chit-chat or redundant messages.
    4. Format the summary as structured bullet points or short paragraphs for easy reuse.

    Chat messages:
    """
    ${JSON.stringify(messages)}
    """
  `
  const result = await env.AI.run('@cf/meta/llama-4-scout-17b-16e-instruct', {prompt, max_tokens: 300})

  return result.response;
}
