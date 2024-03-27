'use client';

import { toastError } from '@/components/toasts';
import { Button } from '@/components/ui/button';
import { useSelectedTodosStore } from '@/store/selected-todos';
import { Trash2 } from 'lucide-react';
import { deleteTodo } from './actions';

export default function DeleteTodo({ id }: { id: number }) {
  const { removeSelectedTodoId } = useSelectedTodosStore();

  const handleDelete = async () => {
    const { error } = await deleteTodo(id);

    if (error) {
      toastError(error);
    }

    if (!error) {
      removeSelectedTodoId(id);
    }
  };

  return (
    <Button variant='outline' size='icon' onClick={handleDelete}>
      <Trash2 className='h-4 w-4 text-red-500' />
    </Button>
  );
}
