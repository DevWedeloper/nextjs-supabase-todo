import { create } from 'zustand';

type SelectedTodosState = {
  selectedTodoIds: number[];
  setSelectedTodoIds: (ids: number[]) => void;
  toggleSelectedTodoId: (id: number) => void;
  clearSelectedTodoIds: () => void;
};

export const useSelectedTodosStore = create<SelectedTodosState>((set) => ({
  selectedTodoIds: [],
  setSelectedTodoIds: (ids) => set({ selectedTodoIds: ids }),
  toggleSelectedTodoId: (id) =>
    set((state) => ({
      selectedTodoIds: state.selectedTodoIds.includes(id)
        ? state.selectedTodoIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedTodoIds, id],
    })),
  clearSelectedTodoIds: () => set({ selectedTodoIds: [] }),
}));
