import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TodoApi from "../../api/todo";
import { Todo } from "../../type/todo";
import AddModal from "./components/AddModal";

function TodoList() {
  const accessToken = localStorage.getItem("AT");
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getTodoListQuery = useQuery(
    ["getTodoListQuery", accessToken],
    () => TodoApi.getTodos(accessToken),
    {
      enabled: !!accessToken,
      onSuccess: (data) => setTodos(data),
      onError: () => {
        alert("로그인이 만료 되었습니다.");
        navigate("/auth/login");
      },
      retry: 0,
    }
  );

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
              <Style.CreateDate>{getDate(todo.createdAt)}</Style.CreateDate>
              <Style.CreateDate>{todo.title}</Style.CreateDate>
              <Style.CreateDate>수정</Style.CreateDate>
              <Style.CreateDate>삭제</Style.CreateDate>
            </Style.Todo>
          ))}
      </Style.TodoListSection>
      <AddModal open={isOpen} closeModal={closeAddModal} token={accessToken} />
    </Style.TodoListContainer>
  );
}

export default TodoList;

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
    max-height: 30px;
  `,
  TodoListTitleWrap: styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    text-align: center;
  `,
  CreateDate: styled.p`
    flex-grow: 0.5;
    max-width: 100px;
  `,
  TodoTitle: styled.p`
    flex-grow: 1;
  `,
  TodoUpdate: styled.p`
    min-width: 60px;
  `,
  TodoDelete: styled.p`
    min-width: 60px;
  `,
  Todo: styled.div`
    display: flex;
  `,
};
