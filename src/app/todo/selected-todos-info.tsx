'use client';

import { toastError } from '@/components/toasts';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSelectedTodosStore } from '@/store/selected-todos';
import { Trash2, X } from 'lucide-react';
import { deleteAllSelectedTodos } from './actions';

export default function SelectedTodosInfo({ count }: { count: number }) {
  const { selectedTodoIds, clearSelectedTodoIds } = useSelectedTodosStore();

  const handleOnDeleteAllSelected = async () => {
    const { error } = await deleteAllSelectedTodos(selectedTodoIds);

    if (error) {
      toastError(`${error}`);
    }

    if (!error) {
      clearSelectedTodoIds();
    }
  };

  const handleOnUnselectAll = () => {
    clearSelectedTodoIds();
  };

  return (
    <div className='flex flex-1 items-center gap-16'>
      <div className='text-muted-foreground text-sm'>
        {selectedTodoIds.length} of {count} row(s) selected.
      </div>
      {selectedTodoIds.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='text-sm text-blue-500 hover:!text-blue-500'
            >
              Manage selection
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleOnDeleteAllSelected}>
              <Trash2 className='mr-2 h-4 w-4 text-red-500' />
              <span>Delete All</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleOnUnselectAll}>
              <X className='mr-2 h-4 w-4' />
              <span>Clear All Selection</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
