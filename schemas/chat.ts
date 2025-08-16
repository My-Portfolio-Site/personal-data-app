import { z } from 'zod/v4';
import { UIMessage } from 'ai';

// Message schema
export const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant']),
  parts: z.array(
    z.union([
      // Step start part
      z.object({
        type: z.literal('step-start'),
        providerMetadata: z.object({
          openai: z.object({
            itemId: z.string()
          }).optional()
        }).optional(),
        state: z.enum(['done', 'pending', 'error']).optional()
      }),
      // Text part
      z.object({
        type: z.literal('text'),
        text: z.string(),
        providerMetadata: z.object({
          openai: z.object({
            itemId: z.string()
          }).optional()
        }).optional(),
        state: z.enum(['done', 'pending', 'error']).optional()
      })
    ])
  )
});


// Chat Schema
export const ChatSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  summary: z.string(),
  messages: z.string(),
  createdAt: z.iso.date(),
  updatedAt: z.iso.date(),
})


// Type export for TypeScript
export type MessageSchemaType = z.infer<typeof MessageSchema>;
export type ChatSchemaType = z.infer<typeof ChatSchema>;