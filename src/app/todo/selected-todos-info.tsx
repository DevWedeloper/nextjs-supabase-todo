import { useSelectedTodosStore } from '@/store/selected-todos';

export default function SelectedTodosInfo({ count }: { count: number }) {
  const { selectedTodoIds } = useSelectedTodosStore();

  return (
    <div className='text-muted-foreground flex-1 text-sm'>
      {selectedTodoIds.length} of {count} row(s) selected.
    </div>
  );
}
