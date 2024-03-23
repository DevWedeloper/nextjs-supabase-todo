import { Todo } from '@/lib/types';
import { createClient } from '@/utils/supabase/server';
import AddTodo from './add-todo';
import { columns } from './todo/columns';
import { DataTable } from './todo/data-table';

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.from('todo').select();

  return (
    <div className='p-4'>
      <div className='flex w-full flex-col gap-4'>
        <AddTodo />
        <DataTable columns={columns} data={data as Todo[]} />
      </div>
    </div>
  );
}
