import HomePage from "home/homepage/HomePage";
import LoginPage from "home/user/LoginPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </>
  );
}
