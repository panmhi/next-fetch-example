import useFetchTodos from '@/hooks/useFetchTodos';
import useQueryFetchTodos from '@/hooks/useQueryFetchTodos';
import useSWRFetchTodos from '@/hooks/useSWRFetchTodos';
import { FC } from 'react';

const Todos: FC = () => {
  // const { todos } = useFetchTodos();
  // const { todos } = useSWRFetchTodos();
  const { todos } = useQueryFetchTodos();

  return (
    <ul className='w-full space-y-4 py-2'>
      {todos.map((todo) => (
        <li key={todo.id} className='flex flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm'>
          {todo.todo}
        </li>
      ))}
    </ul>
  );
};

export default Todos;
