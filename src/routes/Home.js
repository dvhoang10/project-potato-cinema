import NavbarHome from "components/navbar/NavbarHome";
import HomePage from "home/homepage/HomePage";
import ComingSoonPage from "home/movie/ComingSoonPage";
import NowShowingPage from "home/movie/NowShowingPage";
import PersonDetailsPage from "home/people/PersonDetailsPage";
import PeoplePage from "home/people/PeoplePage";
import LoginPage from "home/user/LoginPage";
import SignUpPage from "home/user/SignUpPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import MovieDetailsPage from "home/movie/MovieDetailsPage";
import BookingHistoryPage from "home/user/BookingHistoryPage";
import ProfilePage from "home/user/ProfilePage";
import BookingPage from "home/booking/BookingPage";
import NotFoundPage from "home/NotFoundPage";

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
        <Route
          path="/movie/:id"
          element={<MovieDetailsPage></MovieDetailsPage>}
        ></Route>
        <Route
          path="/booking/:id"
          element={<BookingPage></BookingPage>}
        ></Route>
        <Route path="/people" element={<PeoplePage></PeoplePage>}></Route>
        <Route path="/people/:page" element={<PeoplePage></PeoplePage>}></Route>
        <Route
          path="/person/:id"
          element={<PersonDetailsPage></PersonDetailsPage>}
        ></Route>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
        <Route
          path="/booking-history"
          element={<BookingHistoryPage></BookingHistoryPage>}
        ></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </>
  );
}
