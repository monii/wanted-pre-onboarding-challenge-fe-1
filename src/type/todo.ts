export interface Todo {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

export interface IdWithToken {
  token: string | null;
  id: string;
}

export interface CreateTodo {
  token: string | null;
  todo: TodoInput;
}

export interface UpdateTodo {
  token: string | null;
  todo: TodoInput;
  id: string;
}

export type TodoInput = Pick<Todo, "title" | "content">;
