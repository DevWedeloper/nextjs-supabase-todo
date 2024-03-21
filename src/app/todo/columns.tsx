'use client';

import { Todo } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: 'task',
    header: 'Task',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
  },
  {
    accessorKey: 'due_date',
    header: 'Due Date',
  },
  {
    accessorKey: 'completed',
    header: 'Completed',
  },
];
