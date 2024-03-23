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
    {
      id: 3,
      created_at: new Date(),
      task: 'Mock Task 3',
      due_date: new Date('2024-03-30'),
      completed: false,
    },
    {
      id: 4,
      created_at: new Date(),
      task: 'Mock Task 4',
      due_date: new Date('2024-04-02'),
      completed: true,
    },
    {
      id: 5,
      created_at: new Date(),
      task: 'Mock Task 5',
      due_date: new Date('2024-04-05'),
      completed: false,
    },
    {
      id: 6,
      created_at: new Date(),
      task: 'Mock Task 6',
      due_date: new Date('2024-04-08'),
      completed: false,
    },
    {
      id: 7,
      created_at: new Date(),
      task: 'Mock Task 7',
      due_date: new Date('2024-04-10'),
      completed: false,
    },
    {
      id: 8,
      created_at: new Date(),
      task: 'Mock Task 8',
      due_date: new Date('2024-04-15'),
      completed: true,
    },
    {
      id: 9,
      created_at: new Date(),
      task: 'Mock Task 9',
      due_date: new Date('2024-04-18'),
      completed: false,
    },
    {
      id: 10,
      created_at: new Date(),
      task: 'Mock Task 10',
      due_date: new Date('2024-04-20'),
      completed: false,
    },
    {
      id: 11,
      created_at: new Date(),
      task: 'Mock Task 11',
      due_date: new Date('2024-04-22'),
      completed: false,
    },
  ];
}

export default async function Home() {
  const data = await getData();

  return (
    <div className='p-4'>
      <div className='flex w-full flex-col gap-4'>
        <AddTodo />
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
