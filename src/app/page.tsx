import { Todo } from '@/lib/types';
import AddTodo from './add-todo';
import { columns } from './todo/columns';
import { DataTable } from './todo/data-table';

async function getData(): Promise<Todo[]> {
  return [
    {
      id: 1,
      created_at: new Date(),
      task: 'Mock Task 1',
      due_date: new Date('2024-03-25'),
      completed: false,
    },
    {
      id: 2,
      created_at: new Date(),
      task: 'Mock Task 2',
      due_date: new Date('2024-03-28'),
      completed: true,
    },
  ];
}

export default async function Home() {
  const data = await getData();

  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <div className='flex flex-col gap-4'>
        <AddTodo />
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
