import { Dialog } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import TodoApi from "../../../api/todo";
import { TodoInput } from "../../../type/todo";

interface Props {
  open: boolean;
  token: string | null;
  closeModal: () => void;
}

function AddModal({ open, token, closeModal }: Props) {
  const [todo, setTodo] = useState<TodoInput>({ title: "", content: "" });
  const createTodoMutate = useMutation(() => TodoApi.createTodo(token, todo));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodoMutate.mutate();
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
        <Style.TodoForm onSubmit={handleSubmit}>
          <Style.TodoInputWrap>
            <Style.InputLabel>제목</Style.InputLabel>
            <Style.Input
              type="text"
              name="title"
              value={todo.title}
              onChange={(e) => handleInput(e)}
            />
          </Style.TodoInputWrap>
          <Style.TodoInputWrap>
            <Style.InputLabel>상세 내용</Style.InputLabel>
            <Style.Input
              type="text"
              name="content"
              value={todo.content}
              onChange={(e) => handleInput(e)}
            />
          </Style.TodoInputWrap>
          <Style.AddButtonWrap>
            <Style.AddButton>추가 </Style.AddButton>
          </Style.AddButtonWrap>
        </Style.TodoForm>
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
  TodoForm: styled.form``,
  TodoInputWrap: styled.div`
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
  `,
  InputLabel: styled.span``,
  Input: styled.input`
    flex-grow: 1;
  `,
  AddButtonWrap: styled.div`
    display: flex;
    justify-content: center;
  `,
  AddButton: styled.button``,
};
