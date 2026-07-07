import { useEffect } from 'react';
import AppCard from '../components/AppCard';
import TodoFilterTabs from '../components/TodoFilterTabs';
import TodoList from '../components/TodoList';
import AddTodoBar from '../components/AddTodoBar';
import { signOut } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  filterChanged,
  selectVisibleTodos,
  toggleTodo,
} from '../store/todosSlice';

export default function TodoPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const filter = useAppSelector((state) => state.todos.filter);
  const todosStatus = useAppSelector((state) => state.todos.status);
  const todos = useAppSelector(selectVisibleTodos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = (text: string) => {
    if (!user) return;
    dispatch(addTodo({ text, userId: user.id }));
  };

  return (
    <AppCard>
      <div className="flex items-center justify-between gap-4 px-6 pt-6 sm:px-8">
        <TodoFilterTabs
          filter={filter}
          onChange={(value) => dispatch(filterChanged(value))}
        />
        <button
          type="button"
          onClick={() => dispatch(signOut())}
          className="shrink-0 text-sm text-text-muted underline hover:text-text-primary"
        >
          Sign out
        </button>
      </div>
      {todosStatus === 'loading' ? (
        <p className="px-6 py-10 text-center text-text-muted sm:px-8">
          Loading todos…
        </p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={(id, completed) => dispatch(toggleTodo({ id, completed }))}
          onDelete={(id) => dispatch(deleteTodo(id))}
        />
      )}
      <AddTodoBar onAdd={handleAdd} />
    </AppCard>
  );
}
