import { Dialog } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import TodoApi from "../../../api/todo";
import { CreateTodo, TodoInput } from "../../../type/todo";
import TodoForm from "./TodoForm";

interface Props {
  open: boolean;
  token: string | null;
  closeModal: () => void;
}

function AddModal({ open, token, closeModal }: Props) {
  const [todo, setTodo] = useState<TodoInput>({ title: "", content: "" });
  const createTodoMutate = useMutation(({ token, todo }: CreateTodo) =>
    TodoApi.createTodo({ token, todo })
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodoMutate.mutate({ token, todo });
    closeModal();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <Style.AddTodoContainer open={open} onClose={closeModal}>
      <Style.TitleSection>
        <Style.Title>오늘의 할일</Style.Title>
      </Style.TitleSection>
      <Style.TodoFormSection>
        <TodoForm
          todo={todo}
          buttonText="추가"
          bgColor="#1C6758"
          handleInput={handleInput}
          handleSubmit={handleSubmit}
        />
      </Style.TodoFormSection>
    </Style.AddTodoContainer>
  );
}

export default AddModal;

const Style = {
  AddTodoContainer: styled(Dialog)`
    & .MuiDialog-paper {
      width: 500px;
      padding: 24px;
    }
  `,
  TitleSection: styled.section`
    margin-bottom: 20px;
  `,
  Title: styled.h4``,
  TodoFormSection: styled.section`
    display: flex;
    flex-direction: column;
  `,
};
