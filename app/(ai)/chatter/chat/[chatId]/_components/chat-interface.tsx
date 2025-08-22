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
import { useState, useEffect, use } from 'react';
import { useChat, UIMessage } from '@ai-sdk/react';
import { DefaultChatTransport, SourceUrlUIPart } from 'ai';
import { Response } from '@/components/ai-elements/response';
import { GlobeIcon, RefreshCcwIcon, CopyIcon } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { User } from '@/schemas/user';

const providersModels = [
  {
    provider: 'OpenAI',
    models: [
      {
        name: 'GPT-5',
        value: 'openai/gpt-5',
        webSearchAvailable: false
      },
      {
        name: 'GPT-5 Nano',
        value: 'openai/gpt-5-nano',
        webSearchAvailable: false
      },
      {
        name: 'GPT OSS 120b',
        value: 'openai/gpt-oss-120b',
        webSearchAvailable: false
      },
      {
        name: 'GPT OSS 20b',
        value: 'openai/gpt-oss-20b',
        webSearchAvailable: false
      },
    ]
  },
  {
    provider: 'Groq',
    models: [
      {
        name: 'Llama 4 Scout',
        value: 'meta-llama/llama-4-scout-17b-16e-instruct',
        webSearchAvailable: false
      },
      {
        name: 'GPT OSS 120b',
        value: 'openai/gpt-oss-120b',
        webSearchAvailable: true
      },
      {
        name: 'GPT OSS 20b',
        value: 'openai/gpt-oss-20b',
        webSearchAvailable: true
      }
    ]
  }
];

const ChatInterface = ({
  id,
  currentUser,
  initialMessages,
}: { id: string | undefined; currentUser: User; initialMessages: UIMessage[] }) => {
  const [input, setInput] = useState('');
  
  const availableProviders = Array.from(new Set(providersModels.map(m => m.provider)));
  const [provider, setProvider] = useState<string>(availableProviders[0]);  

  const availableModels = providersModels.find(p => p.provider === provider)?.models || [];
  const [model, setModel] = useState<string>(availableModels[0].value);

  const [isWebSearchAvailable, setIsWebSearchAvailable] = useState<boolean>(providersModels.find(p => p.provider === provider)?.models.find(m => m.value === model)?.webSearchAvailable || false);
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

  useEffect(() => {
    if (availableModels.length > 0) {
      setModel(availableModels[0].value);
    }
  }, [availableModels]);

  useEffect(() => {
    setIsWebSearchAvailable(availableModels.find(m => m.value === model)?.webSearchAvailable || false);
  }, [model]);

  if (error) {
    toast.error(error.message || 'Something went wrong, please try again.', { toasterId: 'single-top' })
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(
        { text: input }, {
        body: {
          provider: provider,
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
        <ConversationContent className='pt-0 px-0 md:px-4'>
          {/* {messages.length === 0 && <h3 className='h-full pt-15 text-center text-muted-foreground'>Start chat by typing your message.</h3>} */}
          {messages.map((message, messageIndex) => {
            const isLastMessage = messageIndex === messages.length - 1;
            const sourceUrls = message.parts.filter(part => part.type === 'source-url');
            // console.log(message);

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
                  ) : (
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
              disabled={!isWebSearchAvailable}
              variant={webSearch ? 'default' : 'ghost'}
              onClick={() => setWebSearch(!webSearch)}
              className={isWebSearchAvailable ? '' : 'cursor-not-allowed'}
            >
              <GlobeIcon size={16} />
              <span>Search</span>
            </PromptInputButton>
            {/* Provider selector */}
            <PromptInputModelSelect
              onValueChange={(value) => {
                setProvider(value);
              }}
              value={provider}
            >
              <PromptInputModelSelectTrigger>
                <PromptInputModelSelectValue />
              </PromptInputModelSelectTrigger>
              <PromptInputModelSelectContent>
                {availableProviders.map((provider) => (
                  <PromptInputModelSelectItem key={provider} value={provider}>
                    {provider}
                  </PromptInputModelSelectItem>
                ))}
              </PromptInputModelSelectContent>
            </PromptInputModelSelect>
            {/* Model selector */}
            <PromptInputModelSelect onValueChange={(value) => { setModel(value) }} value={model}>
              <PromptInputModelSelectTrigger>
                <PromptInputModelSelectValue />
              </PromptInputModelSelectTrigger>
              <PromptInputModelSelectContent>
                {availableModels.map((model) => (
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

