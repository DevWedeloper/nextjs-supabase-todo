'use client';

import { toastError } from '@/components/toasts';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { TTodoSchema, todoSchema } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSelectedTodoStore } from '@/store/selected-todo';
import { useModalStore } from '@/store/use-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Popover } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect, useOptimistic } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { editTodo } from './actions';

export default function EditTodo() {
  const { selectedTodo, setSelectedTodo } = useSelectedTodoStore();
  const { id, task, due_date: deadline, last_edited } = selectedTodo || {};
  const { isOpen, closeModal } = useModalStore();

  const router = useRouter();

  const form = useForm<TTodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      task,
      deadline,
    },
    mode: 'onChange',
  });

  const [
    { task: taskOptimistic, deadline: deadlineOptimistic },
    addOptimisticData,
  ] = useOptimistic<TTodoSchema>({
    task: task || '',
    deadline: deadline || null,
  });

  useEffect(() => {
    form.setValue('task', task ?? '');
    form.setValue('deadline', deadline ?? null);
  }, [task, deadline, form]);

  const taskWatch = useWatch({ control: form.control, name: 'task' });
  const deadlineWatch = useWatch({ control: form.control, name: 'deadline' });

  const onSubmit = async (values: TTodoSchema) => {
    startTransition(() => {
      addOptimisticData({
        task: form.getValues('task'),
        deadline: form.getValues('deadline'),
      });
    });

    if (!id) return;

    const { data, error } = await editTodo(id, values);

    if (data) {
      setSelectedTodo(data);
    }

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
      if ('editTodoError' in error) {
        toastError(`${error.editTodoError}`);
        form.setError('root', { type: 'server', message: error.editTodoError });
      }
    }
  };

  return (
    <Dialog
      onOpenChange={() => {
        closeModal();
        router.back();
      }}
      open={isOpen}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='task'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter your task'
                      {...field}
                      className='max-h-64'
                    />
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
                  <FormLabel>Deadline</FormLabel>
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
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(
                            date
                              ? moment.utc(date).format('YYYY-MM-DDTHH:mm:ssZ')
                              : null,
                          );
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='text-sm text-stone-500 dark:text-stone-400'>
              Last modified: {moment(last_edited).fromNow()}
            </div>
            <DialogFooter>
              <Button
                type='submit'
                disabled={
                  form.formState.isSubmitting ||
                  (taskWatch === taskOptimistic &&
                    deadlineWatch === deadlineOptimistic)
                }
              >
                {form.formState.isSubmitting && (
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                )}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
