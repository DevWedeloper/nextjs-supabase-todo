'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import { addTodo } from './actions';

export default function AddTodo() {
  const [date, setDate] = useState<Date>();
  const ref = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    await addTodo(formData);
    ref.current?.reset();
  };

  return (
    <form
      action={handleSubmit}
      ref={ref}
      className='flex w-full items-center space-x-2'
    >
      <Input id='todo' name='todo' type='text' placeholder='Enter your todo' />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button type='submit'>Add Todo</Button>
    </form>
  );
}
