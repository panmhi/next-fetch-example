import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

type UseFetchTodosReturnValues = {
  todos: any[];
  error: string | null;
  isLoading: boolean;
};

const useFetchTodos = (): UseFetchTodosReturnValues => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortController = useRef<AbortController | null>(null);

  const fetchTodos = useCallback(async () => {
    abortController.current = new AbortController();

    try {
      setIsLoading(true);
      let url = '/api/todos';
      const response = await fetch(url, { signal: abortController.current.signal });
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data.todos);
    } catch (e) {
      if (e instanceof Error) {
        if (e.name === 'AbortError') {
          setError('Request aborted');
        } else {
          setError(e.message);
        }
      } else {
        setError('Something went wrong');
      }
    }
  }, []);

  useEffect(() => {
    fetchTodos();
    return () => {
      abortController.current?.abort();
    };
  }, [fetchTodos]);

  useEffect(() => {
    if (todos.length > 0) {
      toast.success('Todos fetched successfully');
    }
  }, [todos]);

  return { todos, error, isLoading };
};

export default useFetchTodos;
