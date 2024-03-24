import { z } from 'zod';

export type Stringify<T> = {
  [K in keyof T]: string;
};

export const todoSchema = z.object({
  task: z.string().min(1, 'Task is required'),
  deadline: z
    .string()
    .nullable()
    .refine(
      (value) => {
        return (
          value === null ||
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
        );
      },
      {
        message: 'Deadline must be a valid ISO date string or null',
      },
    ),
});

export type TTodoSchema = z.infer<typeof todoSchema>;
