import { wait } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await wait(2000);
    const response = await fetch('https://dummyjson.com/todos?limit=10');
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const data = await response.json();
    return NextResponse.json({ todos: data.todos }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
