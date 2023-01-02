import { Axios } from "../environment/axios";
import { CreateTodo, DeleteTodo, Todo, TodoInput } from "../type/todo";

const TodoApi = {
  getTodos: async (token: string | null): Promise<Todo[]> => {
    const { data } = await Axios.get("/todos", {
      headers: {
        Authorization: token,
      },
    });
    return data.data;
  },
  createTodo: async ({ token, todo }: CreateTodo): Promise<Todo> => {
    const { data } = await Axios.post(
      "/todos",
      { ...todo },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data;
  },
  deleteTodo: async ({ token, id }: DeleteTodo) => {
    const { data } = await Axios.delete(`/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  },
};

export default TodoApi;
