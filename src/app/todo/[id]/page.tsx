import EditTodo from '../edit-todo';
import { fetchTodoById } from './actions';
import EditTodoHandler from './edit-todo-handler';

export default async function Todo({
  params: { id },
}: {
  params: { id: number };
}) {
  const { data, error } = await fetchTodoById(id);

  return (
    <>
      <EditTodoHandler data={data} error={error} />
      <EditTodo />
    </>
  );
}
