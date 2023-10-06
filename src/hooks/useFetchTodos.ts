import { wait } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type UseFetchTodosProps = {
  forceError?: boolean;
};

type UseFetchTodosReturnValues = {
  todos: any[];
  error: string | null;
  isLoading: boolean;
};

const useFetchTodos = ({ forceError }: UseFetchTodosProps): UseFetchTodosReturnValues => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      let url = '/api/todos';

      if (forceError) {
        // Append '?forceError=true' to the url so that the API endpoint will throw an error back to us
        await wait(2000);
        const searchParams = new URLSearchParams({ forceError: 'true' });
        url = `${url}?${searchParams.toString()}`;
      }

      const response = await fetch(url);
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
  }, [forceError]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return { todos, error, isLoading };
};

export default useFetchTodos;
