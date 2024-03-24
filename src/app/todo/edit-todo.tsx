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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { convertToUTCWithoutZ } from '@/lib/date-converter';
import { TTodoSchema, todoSchema } from '@/lib/types';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Popover } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { editTodo } from './actions';

export default function EditTodo({
  dialogTrigger,
  id,
  task,
  deadline,
}: {
  dialogTrigger: React.ReactNode;
  id: number;
  task: string;
  deadline: string | null;
}) {
  const form = useForm<TTodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      task,
      deadline,
    },
  });

  const onSubmit = async (values: TTodoSchema) => {
    const { error } = await editTodo(id.toString(), values);

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
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
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
                              ? convertToUTCWithoutZ(date.toISOString())
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
            <DialogFooter>
              <Button
                type='submit'
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
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
