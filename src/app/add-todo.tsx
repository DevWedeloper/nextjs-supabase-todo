'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRef } from 'react';
import { addTodo } from './actions';

export default function AddTodo() {
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
      <Button type='submit'>Add Todo</Button>
    </form>
  );
}
