import ErrorComponent from "components/common/ErrorComponent";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";
import { Container, Heading } from "styles/Styles";
import { POTATO } from "utils/config";
import HomeBanner from "./HomeBanner";
import HomeCinema from "./HomeCinema";
import HomeMovies from "./HomeMovies";

const HomePage = () => {
  useEffect(() => {
    document.title = `${POTATO}`;
  }, []);
  const { nowShowing, comingSoon } = useSelector((state) => state.movie);
  return (
    <>
      <HomeBanner></HomeBanner>
      <Container>
        <Heading>Now showing</Heading>
        <HomeMovies movies={nowShowing.slice(0, 8)}></HomeMovies>
        <Heading>Coming Soon</Heading>
        <HomeMovies movies={comingSoon.slice(0, 8)}></HomeMovies>
        <Heading>Partner</Heading>
        <HomeCinema></HomeCinema>
      </Container>
    </>
  );
};

export default withErrorBoundary(HomePage, {
  FallbackComponent: ErrorComponent,
});
