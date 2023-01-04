import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import TodoApi from "../../api/todo";
import { IdWithToken, Todo, TodoInput, UpdateTodo } from "../../type/todo";
import AddModal from "./components/AddModal";
import TodoForm from "./components/TodoForm";

function TodoList() {
  const accessToken = localStorage.getItem("AT");
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoDetail, setTodoDetail] = useState<TodoInput>({
    title: "",
    content: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [todoId, setTodoId] = useState<string>("");

  const getTodoListQuery = useQuery(
    ["getTodoListQuery", accessToken],
    () => TodoApi.getTodos(accessToken),
    {
      enabled: false,
      onSuccess: (data) => setTodos(data),
      onError: () => {
        alert("로그인이 만료 되었습니다.");
        navigate("/auth/login");
      },
      retry: 0,
    }
  );

  const getTodoDetailQuery = useQuery(
    ["getTodoDetail", todoId],
    () => TodoApi.getTodoById({ token: accessToken, id: todoId }),
    {
      onSuccess: (data) => setTodoDetail(data),
      onError: () => {
        alert("로그인이 만료 되었습니다.");
        navigate("/auth/login");
      },
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  const updateTodoMutate = useMutation(
    ({ token, todo, id }: UpdateTodo) =>
      TodoApi.updateTodo({ token, todo: todoDetail, id: todoId }),
    {
      onSuccess: () => UpdateList(),
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodoMutate.mutate({
      token: accessToken,
      todo: todoDetail,
      id: todoId,
    });
  };

  const UpdateList = () => {
    setTodoId("");
    getTodoListQuery.refetch();
  };

  const deleteTodoMutation = useMutation(
    ({ token, id }: IdWithToken) => TodoApi.deleteTodo({ token, id }),
    {
      onSuccess: () => getTodoListQuery.refetch(),
    }
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDetail({ ...todoDetail, [e.target.name]: e.target.value });
  };

  const updateTodo = (id: string) => {
    const todoIdFromLocalstorage = localStorage.getItem("CETI");
    const isEditing = todoIdFromLocalstorage === id;

    if (isEditing) {
      localStorage.removeItem("CETI");
      setTodoId("");
    } else {
      setTodoId(id);
      localStorage.setItem("CETI", id);
      getTodoDetailQuery.refetch();
    }
  };

  const deleteTodo = (id: string) => {
    deleteTodoMutation.mutate({ token: accessToken, id });
  };

  const openAddModal = () => {
    setIsOpen(true);
  };

  const closeAddModal = () => {
    setIsOpen(false);
  };

  const getDate = (createAt: string) => {
    const convertedDate = new Date(createAt);
    const year = convertedDate.getFullYear();
    const month = convertedDate.getMonth();
    const date = convertedDate.getDate();

    return `${year}년 ${month + 1}월 ${date}일`;
  };

  useEffect(() => {
    getTodoListQuery.refetch();
  }, [isOpen]);

  useEffect(() => {
    const editTodoId = localStorage.getItem("CETI");
    if (editTodoId) {
      setTodoId(editTodoId);
    }
  }, []);

  return (
    <Style.TodoListContainer>
      <Style.TitleSection>
        <Style.Title> ToDoList</Style.Title>
        <Style.AddButton onClick={openAddModal}>할일 추가</Style.AddButton>
      </Style.TitleSection>
      <Style.TodoListSection>
        <Style.TodoListTitleWrap>
          <Style.CreateDate>생성 날짜</Style.CreateDate>
          <Style.TodoTitle>제목</Style.TodoTitle>
          <Style.TodoUpdate>수정</Style.TodoUpdate>
          <Style.TodoDelete>삭제</Style.TodoDelete>
        </Style.TodoListTitleWrap>
        {todos.length > 0 &&
          todos.map((todo) => (
            <Style.Todo>
              <Style.OriginTodoWrap>
                <Style.CreateDate>{getDate(todo.createdAt)}</Style.CreateDate>
                <Style.TodoTitle>{todo.title}</Style.TodoTitle>
                <Style.TodoUpdateBtn onClick={() => updateTodo(todo.id)}>
                  {todo.id === todoId ? "취소" : "수정"}
                </Style.TodoUpdateBtn>
                <Style.TodoDeleteButton onClick={() => deleteTodo(todo.id)}>
                  삭제
                </Style.TodoDeleteButton>
              </Style.OriginTodoWrap>
              <Style.EditTodoWrap isShowEditForm={todo.id === todoId}>
                <TodoForm
                  todo={todoDetail}
                  buttonText="수정"
                  bgColor="#005792"
                  handleInput={handleInput}
                  handleSubmit={handleSubmit}
                />
              </Style.EditTodoWrap>
            </Style.Todo>
          ))}
      </Style.TodoListSection>
      <AddModal open={isOpen} closeModal={closeAddModal} token={accessToken} />
    </Style.TodoListContainer>
  );
}

export default TodoList;

const TodoListLayout = css`
  display: flex;
  gap: 12px;
  align-items: center;
  text-align: center;
`;

const Button = css`
  min-width: 60px;
  max-height: 40px;
  padding: 8px 12px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const Style = {
  TodoListContainer: styled.div`
    padding: 24px;
  `,
  TitleSection: styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
  Title: styled.h3``,
  TodoListSection: styled.section``,
  AddButton: styled.button`
    ${Button}
    background-color: #1C6758;
    max-height: 30px;
  `,
  TodoListTitleWrap: styled.div`
    ${TodoListLayout}
    border-bottom: 3px solid #c9c9c9;
  `,
  CreateDate: styled.p`
    flex-grow: 0.5;
    max-width: 100px;
  `,
  TodoTitle: styled.p`
    flex-grow: 1;
    text-align: center;
  `,
  TodoUpdate: styled.p`
    min-width: 60px;
  `,
  TodoDelete: styled.p`
    min-width: 60px;
  `,
  Todo: styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #c9c9c9;
    cursor: pointer;
  `,
  OriginTodoWrap: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    margin: 4px 0px;
  `,
  EditTodoWrap: styled.div<{ isShowEditForm: boolean }>`
    display: ${(props) => (props.isShowEditForm ? "block" : "none")};
    margin: ${(props) => (props.isShowEditForm ? "20px 0px" : null)};
  `,
  TodoUpdateBtn: styled.button`
    ${Button}
    background-color: #005792
  `,
  TodoDeleteButton: styled.button`
    ${Button}
    background-color: #eb2632;
  `,
};
