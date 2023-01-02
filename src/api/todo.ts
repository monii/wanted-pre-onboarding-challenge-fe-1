import { Axios } from "../environment/axios";
import { Todo, TodoInput } from "../type/todo";

const TodoApi = {
  getTodos: async (token: string | null): Promise<Todo[]> => {
    const { data } = await Axios.get("/todos", {
      headers: {
        Authorization: token,
      },
    });
    return data.data;
  },
  createTodo: async (
    token: string | null,
    todoInput: TodoInput
  ): Promise<Todo> => {
    const { data } = await Axios.post(
      "/todos",
      { ...todoInput },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data;
  },
};

export default TodoApi;
