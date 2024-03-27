'use client';

import { Button } from '@/components/ui/button';
import { useSelectedTodosStore } from '@/store/selected-todos';

export default function SelectedTodosInfo({ count }: { count: number }) {
  const { selectedTodoIds } = useSelectedTodosStore();

  return (
    <div className='flex flex-1 items-center gap-16'>
      <div className='text-muted-foreground text-sm'>
        {selectedTodoIds.length} of {count} row(s) selected.
      </div>
      {selectedTodoIds.length > 0 && (
        <Button
          variant='ghost'
          size='sm'
          className='text-sm text-blue-500 hover:!text-blue-500'
        >
          Manage selection
        </Button>
      )}
    </div>
  );
}
