import { tool, type ToolUIPart } from 'ai';
import { z } from 'zod';
import Exa from 'exa-js';

export const exa = new Exa(process.env.EXA_API_KEY);

const toolInputSchema = z.object({
  query: z.string().min(1).max(100).describe('The search query'),
});

const toolOutputSchema = z.object({
  title: z.string().describe('The title of the search result'),
  url: z.string().url().describe('The URL of the search result'),
  content: z.string().describe('The content of the search result'),
  publishedDate: z.string().describe('The published date of the search result'),
});

export const webSearchTool = tool({
  name: 'web_search',
  description: 'Search the web for up-to-date information',
  inputSchema: toolInputSchema,
  outputSchema: toolOutputSchema,
  execute: async ({ query }: { query: string }) => {
    const { results } = await exa.searchAndContents(query, {
      livecrawl: 'always',
      numResults: 1,
    });
    console.log("Web search tool results:", results.length);

    return {
      title: results[0].title,
      url: results[0].url,
      content: results[0].text.slice(0, 1000), // take just the first 1000 characters
      publishedDate: results[0].publishedDate,
    };
  },
});

export type WebSearchToolInput = z.infer<typeof toolInputSchema>;

export type WebSearchToolOutput = z.infer<typeof toolOutputSchema>;


export type WebSearchToolUIPart = ToolUIPart<{
  webSearchTool: {
    input: WebSearchToolInput;
    output: WebSearchToolOutput;
  };
}>;