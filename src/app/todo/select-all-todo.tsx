'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useSelectedTodosStore } from '@/store/selected-todos';
import { useEffect, useState } from 'react';

export default function SelectAllTodo({ ids }: { ids: number[] }) {
  const { selectedTodoIds, toggleSelectedTodoId } = useSelectedTodosStore();
  const [isChecked, setIsChecked] = useState(false);
  const [isSomeChecked, setIsSomeChecked] = useState(false);

  useEffect(() => {
    setIsChecked(
      ids.every((id) => selectedTodoIds.includes(id)) && ids.length > 0,
    );
    setIsSomeChecked(ids.some((id) => selectedTodoIds.includes(id)));
  }, [ids, selectedTodoIds]);

  const handleCheckedChange = () => {
    const uncheckedIds = ids.filter((id) => !selectedTodoIds.includes(id));
    if (uncheckedIds.length > 0) {
      uncheckedIds.forEach((id) => toggleSelectedTodoId(id));
    } else {
      ids.forEach((id) => toggleSelectedTodoId(id));
    }
  };

  return (
    <Checkbox
      checked={isChecked || (isSomeChecked && 'indeterminate')}
      onCheckedChange={handleCheckedChange}
      aria-label='Select all'
    />
  );
}
