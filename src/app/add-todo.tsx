'use client';

import { toastError } from '@/components/toasts';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TAddTodoSchema, addTodoSchema } from '@/lib/types';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { addTodo } from './actions';

export default function AddTodo() {
  const form = useForm<TAddTodoSchema>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      task: '',
    },
  });

  const onSubmit = async (values: TAddTodoSchema) => {
    const { error } = await addTodo(values);

    if (error) {
      if ('task' in error) {
        form.setError('task', { type: 'server', message: error.task });
      }
      if ('deadline' in error) {
        form.setError('deadline', {
          type: 'server',
          message: error.deadline,
        });
      }
      if ('addTodoError' in error) {
        toastError(`${error.addTodoError}`);
        form.setError('root', { type: 'server', message: error.addTodoError });
      }
    }

    if (!error) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full items-baseline space-x-2'
      >
        <FormField
          control={form.control}
          name='task'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder='Enter your task' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='deadline'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          ) : null}
          Add Todo
        </Button>
      </form>
    </Form>
  );
}
