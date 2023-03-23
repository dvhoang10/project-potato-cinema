import NavbarHome from "components/navbar/NavbarHome";
import HomePage from "home/homepage/HomePage";
import ComingSoonPage from "home/movie/ComingSoonPage";
import NowShowingPage from "home/movie/NowShowingPage";
import LoginPage from "home/user/LoginPage";
import SignUpPage from "home/user/SignUpPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function Home() {
  document.body.style.background = "#191820";
  return (
    <>
      <NavbarHome></NavbarHome>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/now-showing"
          element={<NowShowingPage></NowShowingPage>}
        ></Route>
        <Route
          path="/coming-soon"
          element={<ComingSoonPage></ComingSoonPage>}
        ></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
      </Routes>
    </>
  );
}
