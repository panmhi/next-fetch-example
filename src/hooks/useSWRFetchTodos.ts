import useSWR from 'swr';
import { useCallback, useRef, MutableRefObject, useEffect } from 'react';

type UseSWRFetchTodosReturnValues = {
  todos: any[];
  error: string | null;
  isLoading: boolean;
};

// SWR with AbortController
const useSWRFetchTodos = (): UseSWRFetchTodosReturnValues => {
  const abortController: MutableRefObject<AbortController | null> = useRef(null);

  const fetchTodos = useCallback(async () => {
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

  const { data: todos, error, isLoading } = useSWR('FETCH_TODOS', fetchTodos);

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
