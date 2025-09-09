export function splitText(text: string, maxTokens: number = 300): string[] {
  const sentences = text.split(/(?<=[.?!])\s+/);
  const chunks: string[] = [];
  let current = '';

  for (let sentence of sentences) {
    if ((current + sentence).length > maxTokens * 4) {
      chunks.push(current);
      current = sentence;
    } else {
      current += ' ' + sentence;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}
