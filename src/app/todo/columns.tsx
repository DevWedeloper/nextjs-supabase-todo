'use client';

import { toastError } from '@/components/toasts';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CircleAlert, Pencil, Trash2 } from 'lucide-react';
import moment from 'moment';
import { Todo } from '../../../types';
import { deleteTodo, updateCompletedStatus } from './actions';
import EditTodo from './edit-todo';

export const columns: ColumnDef<Todo>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    cell: ({ row, column }) =>
      moment(new Date(row.getValue(column.id))).format('MM-DD-YYYY, hh:mm A'),
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
    cell: ({ row, column }) => {
      const dueDate = row.original.due_date;
      const currentDate = new Date();
      const overdue = dueDate && new Date(dueDate) < currentDate;

      const value = row.getValue(column.id);
      if (value === null || value === undefined) {
        return 'n/a';
      }

      return (
        <div className='flex items-center gap-2'>
          {moment(new Date(value as Date)).format('MM-DD-YYYY, hh:mm A')}
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
    accessorKey: 'completed',
    header: 'Completed',
    cell: ({ row, column }) => {
      const handleChange = async (completed: boolean) => {
        const { error } = await updateCompletedStatus(
          row.original.id.toString(),
          completed,
        );

        if (error) {
          toastError(error);
        }
      };

      return (
        <Checkbox
          checked={row.getValue(column.id)}
          onCheckedChange={(value) => {
            handleChange(!!value);
          }}
          aria-label='Select completed'
        />
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const handleDelete = async () => {
        const { error } = await deleteTodo(row.original.id.toString());

        if (error) {
          toastError(error);
        }
      };

      return (
        <div className='flex gap-2'>
          <EditTodo
            dialogTrigger={
              <Button variant='outline' size='icon'>
                <Pencil className='h-4 w-4 text-green-500' />
              </Button>
            }
            id={row.original.id}
            task={row.original.task}
            deadline={row.original.due_date}
          />
          <Button variant='outline' size='icon' onClick={handleDelete}>
            <Trash2 className='h-4 w-4 text-red-500' />
          </Button>
        </div>
      );
    },
  },
];
