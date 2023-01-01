import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthApi from "../../api/auth";
import { AuthForm } from "../../type/user";

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState<AuthForm>({ email: "", password: "" });

  const loginpQuery = useQuery(["signupQuery"], () => AuthApi.login(login), {
    enabled: false,
    onSuccess: () => navigate("/auth/login"),
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginpQuery.refetch();
  };

  return (
    <Style.LoginContainter>
      <Style.TitleSection>
        <Style.Title>로그인</Style.Title>
      </Style.TitleSection>
      <Style.LoginFormSection>
        <Style.Form onSubmit={(e) => handleSubmit(e)}>
          <Style.InputWrap>
            <Style.Label>이메일:</Style.Label>
            <Style.Input
              type="text"
              name="email"
              value={login.email}
              onChange={(e) => handleInput(e)}
            />
          </Style.InputWrap>
          <Style.InputWrap>
            <Style.Label>비밀번호:</Style.Label>
            <Style.Input
              type="password"
              name="password"
              value={login.password}
              onChange={(e) => handleInput(e)}
            />
          </Style.InputWrap>
          <Style.LoginButton type="submit">로그인</Style.LoginButton>
        </Style.Form>
      </Style.LoginFormSection>
    </Style.LoginContainter>
  );
}

export default Login;

const Style = {
  LoginContainter: styled.div``,
  TitleSection: styled.section``,
  Title: styled.h2``,
  LoginFormSection: styled.section``,
  Form: styled.form`
    display: flex;
    flex-direction: column;
  `,
  InputWrap: styled.div`
    display: flex;
    gap: 8px;
    width: 100;
  `,
  Label: styled.span``,
  Input: styled.input`
    margin-bottom: 12px;
    flex-grow: 1;
  `,
  LoginButton: styled.button`
    width: 200px;
    margin: 0 auto;
    cursor: pointer;
  `,
};
