'use client';

import { toastError, toastSuccess } from '@/components/toasts';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical, Trash2 } from 'lucide-react';
import { deleteAllOverdue } from './actions';

export default function TableActionSettings() {
  const handleDeleteAllOverdue = async () => {
    const { count, error } = await deleteAllOverdue();

    if (error) {
      toastError(`${error}`);
    }

    if (count) {
      toastSuccess(`Successfully deleted ${count} overdue todos.`);
    }
  };

  const handleDeleteAllCompleted = async () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant='outline' size='icon'>
          <EllipsisVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Trash2 className='mr-2 h-4 w-4 text-red-500' />
            <span>Delete All</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={handleDeleteAllOverdue}>
                <Trash2 className='mr-2 h-4 w-4 text-red-500' />
                <span>Overdue</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteAllCompleted}>
                <Trash2 className='mr-2 h-4 w-4 text-red-500' />
                <span>Completed</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
