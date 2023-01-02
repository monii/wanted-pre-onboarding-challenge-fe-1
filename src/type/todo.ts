export interface Todo {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

export interface DeleteTodo {
  token: string | null;
  id: string;
}

export interface CreateTodo {
  token: string | null;
  todo: TodoInput;
}

export type TodoInput = Pick<Todo, "title" | "content">;
