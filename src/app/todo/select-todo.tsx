'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useSelectedTodosStore } from '@/store/selected-todos';
import { useEffect, useState } from 'react';

export default function SelectTodo({ id }: { id: number }) {
  const { selectedTodoIds, toggleSelectedTodoId } = useSelectedTodosStore();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsChecked(selectedTodoIds.includes(id));
  }, [id, selectedTodoIds]);

  const handleCheckedChange = () => {
    toggleSelectedTodoId(id);
  };

  return (
    <Checkbox
      checked={isChecked}
      onCheckedChange={handleCheckedChange}
      aria-label='Select row'
    />
  );
}
