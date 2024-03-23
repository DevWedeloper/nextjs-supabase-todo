'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteTodo(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from('todo').delete().eq('id', id);

  revalidatePath('/');

  return { error: error ? error.message : null };
}