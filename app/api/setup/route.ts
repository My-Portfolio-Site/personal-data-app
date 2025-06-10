import { type NextRequest } from 'next/server'

import { db } from '@/lib/db';
import { up, down } from '@/lib/migrations';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const mode = searchParams.get('mode');
  if (mode !== 'up' && mode !== 'down') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  if (mode === 'down') {
    try {
      await down(db);
      console.log('Database reset successfully');
      return new Response('Database reset', { status: 200 });
    } catch (error) {
      console.error('Error resetting database:', error);
      return new Response('Method Not Allowed', { status: 405 });
    }
  }
  else {
    try {
      await up(db);
      console.log('Database initialized successfully');
      return new Response('Database initialized', { status: 200 });
    } catch (error) {
      console.error('Error initializing database:', error);
      return new Response('Method Not Allowed', { status: 405 });
    }
  }

}