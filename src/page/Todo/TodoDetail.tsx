import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TodoApi from "../../api/todo";
import { TodoInput } from "../../type/todo";

function TodoDetail() {
  const accessToken = localStorage.getItem("AT");
  const {
    state: { id },
  } = useLocation();
  const navigate = useNavigate();

  const [editTodo, setEditodo] = useState<TodoInput>({
    title: "",
    content: "",
  });

  useQuery(
    ["getTodoDetail"],
    () => TodoApi.getTodoById({ token: accessToken, id }),
    {
      onSuccess: (data) => setEditodo(data.data),
      onError: () => {
        alert("로그인이 만료 되었습니다.");
        navigate("/auth/login");
      },
      retry: 0,
    }
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditodo({ ...editTodo, [e.target.name]: e.target.value });
  };

  return (
    <Style.TodoDetailContainer>
      <Style.TodoEditForm>
        <Style.Input
          type="text"
          name="title"
          value={editTodo.title}
          onChange={(e) => handleInput(e)}
        />
        <Style.Input
          type="text"
          name="title"
          value={editTodo.title}
          onChange={(e) => handleInput(e)}
        />
      </Style.TodoEditForm>
    </Style.TodoDetailContainer>
  );
}

export default TodoDetail;

const Style = {
  TodoDetailContainer: styled.div``,
  TodoEditForm: styled.form``,
  Input: styled.input``,
};
