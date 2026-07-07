export interface Todo {
  id: string;
  user_id: string;
  text: string;
  completed: boolean;
  created_at: string;
}

export type TodoFilter = 'all' | 'active' | 'completed';
