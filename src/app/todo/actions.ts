'use server';

import { Stringify, TTodoSchema, todoSchema } from '@/lib/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateCompletedStatus(id: number, completed: boolean) {
  const supabase = createClient();
  const { error } = await supabase
    .from('todo')
    .update({ completed })
    .eq('id', id);

  revalidatePath('/');

  return { error: error ? error.message : null };
}

export async function editTodo(id: number, formData: TTodoSchema) {
  const result = todoSchema.safeParse(formData);
  let zodErrors: Partial<Stringify<TTodoSchema>> = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { error: zodErrors };
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('todo')
    .update({
      task: formData.task,
      due_date: formData.deadline,
    })
    .eq('id', id)
    .select()
    .single();

  revalidatePath('/');

  return { data, error: error ? { editTodoError: error.message } : null };
}

export async function deleteTodo(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from('todo').delete().eq('id', id);

  revalidatePath('/');

  return { error: error ? error.message : null };
}

export async function deleteAllSelectedTodos(ids: number[]) {
  const supabase = createClient();
  const { count, error } = await supabase
    .from('todo')
    .delete({ count: 'exact' })
    .in('id', ids);

  revalidatePath('/');

  return { count, error: error ? error.message : null };
}

export async function deleteAllOverdue() {
  const supabase = createClient();
  const { count, error } = await supabase
    .from('todo')
    .delete({ count: 'exact' })
    .lte('due_date', new Date().toISOString());

  revalidatePath('/');

  return { count, error: error ? error.message : null };
}

export async function deleteAllComplete() {
  const supabase = createClient();
  const { count, error } = await supabase
    .from('todo')
    .delete({ count: 'exact' })
    .eq('completed', true);

  revalidatePath('/');

  return { count, error: error ? error.message : null };
}
