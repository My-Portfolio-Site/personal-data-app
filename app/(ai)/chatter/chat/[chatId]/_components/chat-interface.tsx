'use client';
import Cookies from 'js-cookie';

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
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolOutput,
  ToolInput,
} from '@/components/ai-elements/tool';
import { Loader } from '@/components/ai-elements/loader';
import { useState, useEffect } from 'react';
import { useChat, UIMessage } from '@ai-sdk/react';
import { ChatStatus, DefaultChatTransport, SourceUrlUIPart } from 'ai';
import { Response } from '@/components/ai-elements/response';
import { GlobeIcon, RefreshCcwIcon, CopyIcon, Code } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { User } from '@/schemas/user';
import type { WebSearchToolOutput, WebSearchToolUIPart } from '@/server/ai/tools';
import { CodeBlock } from '@/components/ai-elements/code-block';

const availableModels = [
  {
    name: 'GPT-5',
    value: 'openai/gpt-5',
  },
  {
    name: 'GPT-5 Nano',
    value: 'openai/gpt-5-nano',
  },
  {
    name: 'GPT OSS 120b',
    value: 'openai/gpt-oss-120b',
  },
  {
    name: 'GPT OSS 20b',
    value: 'openai/gpt-oss-20b',
  },
];

const ChatInterface = ({
  id,
  currentUser,
  initialMessages,
}: { id: string | undefined; currentUser: User; initialMessages: UIMessage[] }) => {
  const [input, setInput] = useState('');

  const [model, setModel] = useState<string>(Cookies.get('chatter_model') || availableModels[0].value);

  const [webSearch, setWebSearch] = useState<boolean>(false);


  const { messages, sendMessage, status, error, regenerate } = useChat({
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

  const [messageCount, setMessageCount] = useState<number>(messages.length / 2 || initialMessages.length / 2 || 0);
  useEffect(() => {
    setMessageCount(messages.length / 2 || initialMessages.length / 2 || 0);
  }, [messages, initialMessages]);

  const chatLimitReached = messageCount >= 20;

  const handleModelChange = (value: string) => {
    setModel(value);
    Cookies.set("chatter_model", value);
  };

  if (error) {
    toast.error('Something went wrong, please try again.', {
      description: error.message,
      toasterId: 'single-top',
      action: {
        label: 'Close',
        onClick: () => {
          // Close logic here
        }
      }
    });
  }

  if (chatLimitReached) {
    // Show a message indicating the user has reached the limit
    toast.error('You have reached the maximum message limit.', {
      description: 'Please start a new conversation to continue chatting.',
      toasterId: 'single-top',
      // action: {
      //   label: 'New Conversation',
      //   onClick: () => {
      //     // Logic to start a new conversation
      //   }
      // }
    });
  }

  const handleRegenerate = async () => {
    await regenerate({ body: { model, webSearch } });
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
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

      <Toaster id='single-top' richColors position='top-center' visibleToasts={1} closeButton={true} duration={8000} />
      {/* <div className="flex flex-col h-full overflow-hidden"> */}
      <Conversation id='conversations' className='overflow-y-hidden no-child-scrollbar'>
        {messages.length === 0 &&
          <div className='h-full grid content-center'>
            <p className='text-center text-2xl font-bold bg-linear-to-r from-sidebar-primary via-sidebar-primary to-primary bg-clip-text text-transparent'>
              Hello, {currentUser.name.split(" ")[0]}!
            </p>
          </div>
        }
        <ConversationContent className='pt-0 px-0 md:px-3'>
          {messages.map((message, messageIndex) => {
            const isLastMessage = messageIndex === messages.length - 1;
            const sourceUrls = message.parts.filter(part => part.type === 'source-url');
            // console.log(message);
            const messageText = message.parts.find(part => part.type === 'text')?.text;

            return (
              <div key={message.id + "_" + messageIndex}>
                {message.role === 'assistant' && sourceUrls.length > 0 && (
                  <DisplaySources sources={sourceUrls} />
                )}
                <Message from={message.role} key={message.id} className='py-1'>
                  <MessageContent className='group-[.is-assistant]:bg-transparent group-[.is-user]:bg-secondary'>
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
                        case 'tool-webSearchTool':
                          return (
                            <WebSearchToolUI key={`${part.toolCallId}-${i}`} part={part as WebSearchToolUIPart} />
                          );
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>

                  {/* Avatar */}
                  {message.role === 'user' ? (
                    <MessageAvatar src={currentUser.image} name={currentUser.name.toUpperCase()} className='mb-1' />
                  ) : (
                    null
                    // <MessageAvatar src='/bot.png' name='Bot' className='mb-1 p-0.5 bg-white' />
                  )}
                </Message>
                {message.role === 'assistant' && isLastMessage && (
                  <MessageActions messageCount={messageCount} messageTextPart={messageText} regenerate={handleRegenerate} />
                )}
              </div>
            )
          })}
          {status === 'submitted' && <Loader />}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <PromptInputSection
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        status={status}
        webSearch={webSearch}
        setWebSearch={setWebSearch}
        model={model}
        handleModelChange={handleModelChange}
        availableModels={availableModels}
        chatLimitReached={chatLimitReached}
      />
    </div>
  )

}

const DisplaySources = ({ sources }: { sources: SourceUrlUIPart[] }) => {
  return (
    <Sources className='mb-0 ml-10'>
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

const WebSearchToolUI = ({ part }: { part: WebSearchToolUIPart }) => {
  return (
    <Tool defaultOpen={false}>
      <ToolHeader type="tool-webSearchTool" state={part.state} />
      <ToolContent>
        <ToolInput input={part.input} />
        <ToolOutput
          output={
            <CodeBlock code={JSON.stringify(part.output, null, 2)} language='json' />
          }
          errorText={part.errorText}
        />
      </ToolContent>
    </Tool>
  )
}

const MessageActions = ({ messageCount, messageTextPart, regenerate }: { messageCount: number; messageTextPart: string | undefined; regenerate: () => void }) => {
  return (
    <Actions className="h-6 ml-2">
      <span className='text-xs text-gray-500 px-2'>
        {messageCount}/20
      </span>
      <Action
        onClick={() => regenerate()}
        label="Retry"
      >
        <RefreshCcwIcon className="size-3" />
      </Action>
      <Action
        onClick={() =>
          navigator.clipboard.writeText(messageTextPart || "")
        }
        label="Copy"
        className='active:text-amber-200'
      >
        <CopyIcon className="size-3 " />
      </Action>

    </Actions>
  )
}


const PromptInputSection = ({
  input,
  setInput,
  handleSubmit,
  status,
  webSearch,
  setWebSearch,
  model,
  handleModelChange,
  availableModels,
  chatLimitReached
}: {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  status: ChatStatus | undefined;
  webSearch: boolean;
  setWebSearch: React.Dispatch<React.SetStateAction<boolean>>;
  model: string;
  handleModelChange: (value: string) => void;
  availableModels: Array<{ value: string; name: string }>;
  chatLimitReached: boolean;
}) => {
  return (
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
            onValueChange={handleModelChange}
            value={model}
          >
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
        <PromptInputSubmit status={status} disabled={chatLimitReached} />
      </PromptInputToolbar>
    </PromptInput>
  );
};


export default ChatInterface;

