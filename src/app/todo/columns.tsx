'use client';

import { Button } from '@/components/ui/button';
import { Todo } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: 'task',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Task
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Due Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'completed',
    header: 'Completed',
  },
];
