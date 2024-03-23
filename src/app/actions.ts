'use server';

import { Stringify, TAddTodoSchema, addTodoSchema } from '@/lib/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData: TAddTodoSchema) {
  const result = addTodoSchema.safeParse(formData);
  let zodErrors: Partial<Stringify<TAddTodoSchema>> = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { error: zodErrors };
  }

  const supabase = createClient();
  const { error } = await supabase
    .from('todo')
    .insert({
      due_date: formData.deadline?.toISOString(),
      task: formData.task,
    });

  revalidatePath('/');

  return { error: error ? { addTodoError: error.message } : null };
}
