'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Actions, Action } from '@/components/ai-elements/actions';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/source';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Message, MessageContent, MessageAvatar } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { Loader } from '@/components/ai-elements/loader';
import { useState } from 'react';
import { useChat, UIMessage } from '@ai-sdk/react';
import { DefaultChatTransport, SourceUrlUIPart } from 'ai';
import { Response } from '@/components/ai-elements/response';
import { GlobeIcon, RefreshCcwIcon, CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { User } from '@/schemas/user';

const models = [
  {
    name: 'GPT 4o',
    value: 'openai/gpt-4o',
  },
  {
    name: 'Deepseek R1',
    value: 'deepseek/deepseek-r1',
  },
];

const ChatInterface = ({
  id,
  currentUser,
  initialMessages,
}: { id: string | undefined; currentUser: User; initialMessages: UIMessage[] }) => {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState<boolean>(false);
  const { messages, sendMessage, status, error } = useChat({
    id, // use the provided chat ID
    messages: initialMessages, // load initial messages
    transport: new DefaultChatTransport({
      api: '/api/chatter',
      // only send the last message to the server:
      prepareSendMessagesRequest({ messages, id, body }) {
        return { body: { message: messages[messages.length - 1], id, ...body } };
      },
    }),
  });

  if (error) {
    toast.error(error.message || 'Something went wrong, please try again.', { toasterId: 'single-top' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(
        { text: input }, {
        body: {
          model: model,
          webSearch: webSearch
        },
      },
      );
      setInput('');
    }
  };

  return (
    // <div className="max-w-4xl mx-auto relative size-full ">
    <div className='flex flex-col size-full'>

      <Toaster id='single-top' richColors position='top-center' visibleToasts={1} />
      {/* <div className="flex flex-col h-full overflow-hidden"> */}
      <Conversation id='conversations' className='overflow-y-hidden no-child-scrollbar'>
        <ConversationContent className='pt-0'>
          {messages.map((message, messageIndex) => {
            const isLastMessage = messageIndex === messages.length - 1;
            const sourceUrls = message.parts.filter(part => part.type === 'source-url');
            console.log(message);
            
            return (
              <div key={message.id}>
                {message.role === 'assistant' && sourceUrls.length > 0 && (
                  <DisplaySources sources={sourceUrls} />
                )}
                <Message from={message.role} key={message.id} className='py-3'>
                  <MessageContent>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return (
                            <div key={`${message.id}-${i}`}>
                              <Response>{part.text}</Response>

                            </div>
                          );
                        case 'reasoning':
                          return (
                            <Reasoning
                              key={`${message.id}-${i}`}
                              className="w-full"
                              isStreaming={status === 'streaming'}
                            >
                              <ReasoningTrigger />
                              <ReasoningContent>{part.text}</ReasoningContent>
                            </Reasoning>
                          );
                        default:
                          return null;
                      }
                    })}

                  </MessageContent>
                  {message.role === 'user' ? (
                    <MessageAvatar src={currentUser.image} name={currentUser.name.toUpperCase()} className='mb-1' />
                  ):(
                      <MessageAvatar src='/bot.png' name='Bot' className='mb-1 p-0.5 bg-white' />
                  )}
                  
                </Message>
                {message.role === 'assistant' && isLastMessage && (
                  <Actions className="h-6 ml-10">
                    <Action
                      // onClick={() => regenerate()}
                      label="Retry"
                    >
                      <RefreshCcwIcon className="size-3" />
                    </Action>
                    <Action
                      onClick={() =>
                        navigator.clipboard.writeText("part.text")
                      }
                      label="Copy"
                    >
                      <CopyIcon className="size-3" />
                    </Action>
                  </Actions>
                )}
              </div>
            )
          })}
          {status === 'submitted' && <Loader />}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInput onSubmit={handleSubmit} className="mt-2">
        <PromptInputTextarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <PromptInputToolbar>
          <PromptInputTools>
            <PromptInputButton
              variant={webSearch ? 'default' : 'ghost'}
              onClick={() => setWebSearch(!webSearch)}
            >
              <GlobeIcon size={16} />
              <span>Search</span>
            </PromptInputButton>
            <PromptInputModelSelect
              onValueChange={(value) => {
                setModel(value);
              }}
              value={model}
            >
              <PromptInputModelSelectTrigger>
                <PromptInputModelSelectValue />
              </PromptInputModelSelectTrigger>
              <PromptInputModelSelectContent>
                {models.map((model) => (
                  <PromptInputModelSelectItem key={model.value} value={model.value}>
                    {model.name}
                  </PromptInputModelSelectItem>
                ))}
              </PromptInputModelSelectContent>
            </PromptInputModelSelect>
          </PromptInputTools>
          <PromptInputSubmit disabled={!input} status={status} />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  )

}

const DisplaySources = ({ sources }: { sources: SourceUrlUIPart[] }) => {
  return (
    <Sources className='mb-0'>
      <SourcesTrigger count={sources.length}
      />
      {sources.map((url, i) => {
        return (
          <SourcesContent key={`${url.sourceId}-${i}`}>
            <Source
              href={url.url}
              title={url.url}
            />
          </SourcesContent>
        );
      })}
    </Sources>
  )

}


export default ChatInterface;

