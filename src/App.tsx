import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./page/auth/Login";
import SignUp from "./page/auth/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/auth/signup" element={<SignUp />}></Route>
      <Route path="/auth/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
