import HomePage from "home/homepage/HomePage";
import LoginPage from "home/user/LoginPage";
import SignUpPage from "home/user/SignUpPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
      </Routes>
    </>
  );
}
