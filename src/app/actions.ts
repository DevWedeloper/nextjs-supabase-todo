'use server';

import { TAddTodoSchema, addTodoSchema } from '@/lib/types';

export async function addTodo(data: TAddTodoSchema) {
  const result = addTodoSchema.safeParse(data);
  let zodErrors: Partial<TAddTodoSchema> = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { error: zodErrors };
  }

  return { error: null };
}
