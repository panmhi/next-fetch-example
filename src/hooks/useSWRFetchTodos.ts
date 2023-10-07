import useSWR from 'swr';
import { useCallback, useRef, useEffect } from 'react';

// SWR with AbortController
const useSWRFetchTodos = () => {
  const abortController = useRef<AbortController | null>(null);

  const fetchTodos = useCallback(async (): Promise<any[]> => {
    abortController.current = new AbortController();
    try {
      let url = '/api/todos';
      const response = await fetch(url, { signal: abortController.current.signal });
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      return data.todos;
    } catch (e) {
      throw e;
    }
  }, []);

  const { data: todos, error, isLoading } = useSWR('SWR_TODOS', fetchTodos);

  useEffect(() => {
    return () => {
      abortController.current?.abort();
    };
  }, []);

  return {
    todos: todos || [],
    error,
    isLoading
  };
};

export default useSWRFetchTodos;
