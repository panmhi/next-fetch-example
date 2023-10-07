import { useQuery } from '@tanstack/react-query';

// TanStack Query provides each query function with an AbortSignal instance
const fetchTodos = async ({ signal }: { signal: AbortSignal | undefined }): Promise<any[]> => {
  try {
    let url = '/api/todos';
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const data = await response.json();
    return data.todos;
  } catch (e) {
    throw e;
  }
};

const useQueryFetchTodos = () => {
  const {
    data: todos,
    error,
    isLoading
  } = useQuery({
    queryKey: ['QUERY_TODOS'],
    queryFn: async ({ signal }) => fetchTodos({ signal })
  });
  return {
    todos: todos || [], // type is infered from the queryFn return type
    error,
    isLoading
  };
};

export default useQueryFetchTodos;
