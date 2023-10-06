import useSWR from 'swr';
import { useCallback } from 'react';

type UseSWRFetchTodosReturnValues = {
  todos: any[];
  error: string | null;
  isLoading: boolean;
};

const useSWRFetchTodos = (): UseSWRFetchTodosReturnValues => {
  const fetchTodos = useCallback(async () => {
    try {
      let url = '/api/todos';
      const response = await fetch(url);
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

  return {
    todos: todos || [],
    error,
    isLoading
  };
};

export default useSWRFetchTodos;
