import { create } from 'zustand';
import { Todo } from '../../types';

interface SelectedTodoModalState {
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
}

export const useSelectedTodoStore = create<SelectedTodoModalState>(
  (set) => ({
    selectedTodo: null,
    setSelectedTodo: (todo) => set({ selectedTodo: todo }),
  }),
);
