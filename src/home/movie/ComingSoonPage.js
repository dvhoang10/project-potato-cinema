import ErrorComponent from "components/common/ErrorComponent";
import LoadingPageV1 from "components/loading/v1/LoadingPageV1";
import LoadingPageV2 from "components/loading/v2/LoadingPageV2";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesList } from "store/movie/movieHandlers";
import { Container, GridCardV1, GridCardV2, Heading } from "styles/Styles";
import { GROUP_ID_MOVIE } from "utils/config";
import MovieCardV1 from "components/movieCard/v1/MovieCardV1";
import MovieCardV2 from "components/movieCard/v2/MovieCardV2";

const NowShowingPage = () => {
  const dispatch = useDispatch();
  const { comingSoon } = useSelector((state) => state.movie);
  const { loading } = useSelector((state) => state.loading);
  useEffect(() => {
    document.title = `Coming soon`;
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getMoviesList({ groupId: GROUP_ID_MOVIE })).unwrap();
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <Container>
      <Heading>Now Showing</Heading>
      {loading ? (
        <LoadingPageV1></LoadingPageV1>
      ) : (
        <GridCardV1>
          {comingSoon.map((movie, index) => (
            <MovieCardV1 movie={movie} key={index}></MovieCardV1>
          ))}
        </GridCardV1>
      )}
      {loading ? (
        <LoadingPageV2></LoadingPageV2>
      ) : (
        <GridCardV2>
          {comingSoon.map((movie, index) => (
            <MovieCardV2 movie={movie} key={index}></MovieCardV2>
          ))}
        </GridCardV2>
      )}
    </Container>
  );
};

export default withErrorBoundary(NowShowingPage, {
  FallbackComponent: ErrorComponent,
});
