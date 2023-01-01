import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthApi from "../../api/auth";
import { AuthForm } from "../../type/user";
import { emailRegExp, validatePassword } from "../../util/common";

function SignUp() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState<AuthForm>({ email: "", password: "" });
  const [isDisable, setIsDisable] = useState<boolean>(true);

  const signupQuery = useQuery(
    ["signupQuery"],
    () => AuthApi.createUser(signup),
    {
      enabled: false,
      onSuccess: () => navigate("/auth/login"),
    }
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupQuery.refetch();
  };

  useEffect(() => {
    const isCollectEmail = emailRegExp(signup.email);
    const isCollectPassword = validatePassword(signup.password);

    if (isCollectEmail && isCollectPassword) setIsDisable(false);
  }, [signup]);

  return (
    <Style.SignUpContaienr>
      <Style.TitleSection>
        <Style.Title>회원가입</Style.Title>
      </Style.TitleSection>
      <Style.SignupFormSection>
        <Style.Form onSubmit={(e) => handleSubmit(e)}>
          <Style.InputWrap>
            <Style.Label>이메일:</Style.Label>
            <Style.Input
              type="text"
              name="email"
              value={signup.email}
              onChange={(e) => handleInput(e)}
            />
          </Style.InputWrap>
          <Style.InputWrap>
            <Style.Label>비밀번호:</Style.Label>
            <Style.Input
              type="password"
              name="password"
              value={signup.password}
              onChange={(e) => handleInput(e)}
            />
          </Style.InputWrap>
          <Style.SignUpButton type="submit" isDisable disabled={isDisable}>
            회원가입
          </Style.SignUpButton>
        </Style.Form>
      </Style.SignupFormSection>
    </Style.SignUpContaienr>
  );
}

export default SignUp;

const Style = {
  SignUpContaienr: styled.div`
    margin: 0 auto;
    width: 500px;
  `,
  TitleSection: styled.section`
    margin-bottom: 40px;
  `,
  Title: styled.h2``,
  SignupFormSection: styled.section``,
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
  SignUpButton: styled.button<{ isDisable: boolean }>`
    width: 200px;
    margin: 0 auto;
    cursor: pointer;
  `,
};
