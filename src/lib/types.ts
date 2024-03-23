import { z } from 'zod';

export const addTodoSchema = z.object({
  task: z.string().min(1, 'Task is required'),
  deadline: z.date().optional(),
});

export type TAddTodoSchema = z.infer<typeof addTodoSchema>;
