import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabaseClient';
import type { Todo, TodoFilter } from '../types/todo';
import type { RootState } from './store';

interface TodosState {
  items: Todo[];
  filter: TodoFilter;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data as Todo[];
});

export const addTodo = createAsyncThunk(
  'todos/add',
  async ({ text, userId }: { text: string; userId: string }) => {
    const { data, error } = await supabase
      .from('todos')
      .insert({ text, user_id: userId })
      .select()
      .single();
    if (error) throw error;
    return data as Todo;
  },
);

export const toggleTodo = createAsyncThunk(
  'todos/toggle',
  async ({ id, completed }: { id: string; completed: boolean }) => {
    const { data, error } = await supabase
      .from('todos')
      .update({ completed })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Todo;
  },
);

export const deleteTodo = createAsyncThunk('todos/delete', async (id: string) => {
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) throw error;
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    filterChanged(state, action: PayloadAction<TodoFilter>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load todos';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      });
  },
});

export const { filterChanged } = todosSlice.actions;
export default todosSlice.reducer;

const selectTodoItems = (state: RootState) => state.todos.items;
const selectTodoFilter = (state: RootState) => state.todos.filter;

export const selectVisibleTodos = createSelector(
  [selectTodoItems, selectTodoFilter],
  (items, filter): Todo[] => {
    if (filter === 'active') return items.filter((todo) => !todo.completed);
    if (filter === 'completed') return items.filter((todo) => todo.completed);
    return items;
  },
);
