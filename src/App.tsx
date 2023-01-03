import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./page/auth/Login";
import SignUp from "./page/auth/SignUp";
import TodoDetail from "./page/Todo/TodoDetail";
import ToDoList from "./page/Todo/TodoList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ToDoList />}></Route>
      <Route path="/todo/:id" element={<TodoDetail />}></Route>
      <Route path="/auth/signup" element={<SignUp />}></Route>
      <Route path="/auth/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
