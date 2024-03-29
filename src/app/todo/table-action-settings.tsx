'use client';

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

export default function TableActionSettings() {
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
              <DropdownMenuItem>
                <Trash2 className='mr-2 h-4 w-4 text-red-500' />
                <span>Overdue</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
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
