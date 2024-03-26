import { createClient } from '@/utils/supabase/server';
import AddTodo from './add-todo';
import { columns } from './todo/columns';
import { DataTable } from './todo/data-table';

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = parseInt((searchParams?.page as string) ?? '1', 10);
  const pageSize = parseInt((searchParams?.pageSize as string) ?? '10', 10);
  const sortBy = (searchParams?.sortBy as string) ?? 'task';
  const sortOrder = (searchParams?.sortOrder as string) ?? 'asc';
  const searchQuery = (searchParams?.searchQuery as string) ?? '';
  const offset = (page - 1) * pageSize;

  const supabase = createClient();

  let query = supabase.from('todo').select('*', { count: 'exact' });
  if (searchQuery) {
    query = query.filter('task', 'ilike', `%${searchQuery}%`);
  }

  const { data, count } = await query
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range(offset, offset + pageSize - 1);

  const totalPages = Math.ceil(count ?? 0 / pageSize);

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='flex w-full flex-col gap-4'>
        <AddTodo />
        <DataTable
          columns={columns}
          data={data ?? []}
          count={count ?? 0}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
