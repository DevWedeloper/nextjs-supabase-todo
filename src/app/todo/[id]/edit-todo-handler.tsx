'use client';

import { toastError } from '@/components/toasts';
import { useSelectedTodoStore } from '@/store/selected-todo';
import { useModalStore } from '@/store/use-modal';
import { useEffect } from 'react';
import { Todo } from '../../../../types';

export default function EditTodoHandler({
  data,
  error,
}: {
  data: Todo | null;
  error: string | null;
}) {
  const { openModal } = useModalStore();
  const { setSelectedTodo } = useSelectedTodoStore();

  useEffect(() => {
    openModal();
  }, [openModal]);

  useEffect(() => {
    if (error) {
      toastError(error);
    }

    if (data) {
      setSelectedTodo(data);
    }
  }, [data, error, setSelectedTodo]);

  return <></>;
}
