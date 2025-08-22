import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { saveChat, loadChat } from '@/lib/ai/chat-store-db';
import { ChatSchemaType } from '@/schemas/chat';
import { generateId } from 'ai';
import { groq } from '@ai-sdk/groq';


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { id, model, provider, webSearch, message }: { id: string; model: string; provider: string; webSearch: boolean; message: UIMessage } = await req.json();

  // load the previous messages from the server
  const chat = await loadChat(id) as ChatSchemaType
  const previousMessages = JSON.parse(chat.messages) as UIMessage[]

  // append the new message to the previous messages:
  const messages = [...previousMessages, message];
  const systemMessage = 'You are a helpful assistant that can answer questions and help with tasks'
  console.log('Provider: ', provider, ' Model:', model);

  
  // const resultGroq = streamText({
  //   model: groq(model),
  //   tools: {
  //     browser_search: webSearchTool,
  //   },
  //   messages: convertToModelMessages(messages),
  //   maxOutputTokens: 500,
  //   system: systemMessage
  // })

  // const resultOpenai = streamText({
  //   model: model,
  //   messages: convertToModelMessages(messages),
  //   maxOutputTokens: 500,
  //   system: systemMessage
  // });

  // result.consumeStream(); // no await
  
  const webSearchTool = groq.tools.browserSearch({});
  const result = provider.toLowerCase() === 'groq' ? 
  streamText({
      model: groq(model),
      tools: {
        browser_search: webSearchTool,
      },
      toolChoice: webSearch ? 'required' : 'auto',
      messages: convertToModelMessages(messages),
      maxOutputTokens: 500,
      system: systemMessage
    }) 
    : 
    streamText({
      model: model,
      messages: convertToModelMessages(messages),
      maxOutputTokens: 500,
      system: systemMessage
    });
  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
    originalMessages: messages,
    onFinish: async ({ responseMessage }) => {
      if (!responseMessage.id) {
        responseMessage.id = generateId();
      }
      // console.log("API: result msg:", responseMessage);
      // save response message
      await saveChat({ chatId: id, messages: [...messages, responseMessage] });
    },
  });
}