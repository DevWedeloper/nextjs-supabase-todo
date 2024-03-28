'use client';

import { toastError } from '@/components/toasts';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ColumnDef } from '@tanstack/react-table';
import { CircleAlert } from 'lucide-react';
import moment from 'moment';
import { Todo } from '../../../types';
import { updateCompletedStatus } from './actions';
import DeleteTodo from './delete-todo';
import EditTodoTrigger from './edit-todo-trigger';
import SelectAllTodo from './select-all-todo';
import SelectTodo from './select-todo';
import ToggleCreatedAt from './toggle-created-at';
import ToggleDueDate from './toggle-due-date';
import ToggleTask from './toggle-task';

export const columns: ColumnDef<Todo>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <SelectAllTodo
        ids={table.getRowModel().rows.map((row) => row.original.id)}
      />
    ),
    cell: ({ row }) => <SelectTodo id={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'Task',
    header: () => <ToggleTask />,
    cell: ({ row }) => <p className='max-w-xs truncate'>{row.original.task}</p>,
  },
  {
    accessorKey: 'Created At',
    header: () => <ToggleCreatedAt />,
    cell: ({ row }) =>
      moment(new Date(row.original.created_at)).format('MM-DD-YYYY, hh:mm A'),
  },
  {
    accessorKey: 'Due Date',
    header: () => <ToggleDueDate />,
    cell: ({ row }) => {
      const dueDate = row.original.due_date;
      const currentDate = new Date();
      const overdue = dueDate && new Date(dueDate) < currentDate;

      if (dueDate === null || dueDate === undefined) {
        return 'n/a';
      }

      return (
        <div className='flex items-center gap-2'>
          {moment(dueDate).format('MM-DD-YYYY, hh:mm A')}
          {overdue && (
            <TooltipProvider disableHoverableContent>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleAlert className='text-red-500' />
                </TooltipTrigger>
                <TooltipContent>
                  <p>This task is overdue.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'Completed',
    header: 'Completed',
    cell: ({ row }) => {
      const handleChange = async (completed: boolean) => {
        const { error } = await updateCompletedStatus(
          row.original.id,
          completed,
        );

        if (error) {
          toastError(error);
        }
      };

      return (
        <Checkbox
          checked={row.original.completed}
          onCheckedChange={(value) => {
            handleChange(!!value);
          }}
          aria-label='Select completed'
        />
      );
    },
  },
  {
    id: 'Actions',
    cell: ({ row }) => {
      return (
        <div className='flex gap-2'>
          <EditTodoTrigger todo={row.original} />
          <DeleteTodo id={row.original.id} />
        </div>
      );
    },
  },
];
