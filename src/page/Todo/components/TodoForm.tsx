import React from "react";
import styled from "styled-components";
import { TodoInput } from "../../../type/todo";

interface Props {
  todo: TodoInput;
  buttonText: string;
  bgColor: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

function TodoForm({
  todo,
  buttonText,
  bgColor,
  handleInput,
  handleSubmit,
}: Props) {
  return (
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
        <Style.AddButton bgColor={bgColor}>{buttonText}</Style.AddButton>
      </Style.AddButtonWrap>
    </Style.TodoForm>
  );
}

export default TodoForm;

const Style = {
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
  AddButton: styled.button<{ bgColor: string }>`
    min-width: 60px;
    max-height: 40px;
    padding: 8px 12px;
    color: white;
    border: none;
    cursor: pointer;
    background-color: ${(props) => props.bgColor};
    border-radius: 5px;
  `,
};
