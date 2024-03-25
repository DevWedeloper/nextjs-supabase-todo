import { createClient } from '@/utils/supabase/server';
import AddTodo from './add-todo';
import { columns } from './todo/columns';
import { DataTable } from './todo/data-table';

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createClient();
  const { data } = await supabase.from('todo').select().order('task');
  console.log(searchParams);
  
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='flex w-full flex-col gap-4'>
        <AddTodo />
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </div>
  );
}
