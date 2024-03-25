'use server';

import { Stringify, TTodoSchema, todoSchema } from '@/lib/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateCompletedStatus(id: string, completed: boolean) {
  const supabase = createClient();
  const { error } = await supabase
    .from('todo')
    .update({ completed })
    .eq('id', id);

  revalidatePath('/');

  return { error: error ? error.message : null };
}

export async function editTodo(id: string, formData: TTodoSchema) {
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
    .eq('id', id);

  revalidatePath('/');

  return { data, error: error ? { editTodoError: error.message } : null };
}

export async function deleteTodo(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('todo').delete().eq('id', id);

  revalidatePath('/');

  return { error: error ? error.message : null };
}
