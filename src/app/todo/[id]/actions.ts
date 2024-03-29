'use server';

import { createClient } from '@/utils/supabase/server';

export async function fetchTodoById(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('todo')
    .select()
    .eq('id', id)
    .single();

  return { data, error: error ? error.message : null };
}
