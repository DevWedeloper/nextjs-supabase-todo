'use client';

import { Button } from '@/components/ui/button';
import { useSelectedTodoStore } from '@/store/selected-todo';
import { useModalStore } from '@/store/use-modal';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { Todo } from '../../../types';

export default function EditTodoTrigger({ todo }: { todo: Todo }) {
  const { setSelectedTodo } = useSelectedTodoStore();
  const { openModal } = useModalStore();

  const handleButtonClick = () => {
    setSelectedTodo(todo);
    openModal();
  };

  return (
    <Button variant='outline' size='icon' asChild onClick={handleButtonClick}>
      <Link href={`/todo/${todo.id}`} scroll={false}>
        <Pencil className='h-4 w-4 text-green-500' />
      </Link>
    </Button>
  );
}
