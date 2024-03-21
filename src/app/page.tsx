import { AddTodo } from './add-todo';

export default function Home() {
  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <AddTodo />
    </div>
  );
}
