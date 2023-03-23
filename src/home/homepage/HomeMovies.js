import ErrorComponent from "components/common/ErrorComponent";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesList } from "store/movie/movieHandlers";
import { GROUP_ID_MOVIE } from "utils/config";
import PropTypes from "prop-types";
import MovieCardV1 from "components/movieCard/v1/MovieCardV1";
import {
  ReactSlick,
  RSNextArrow,
  RSPrevArrow,
} from "components/reactSlick/ReactSlick";
import LoadingCardV1 from "components/loading/v1/LoadingCardV1";

const HomeMovies = ({ movies }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
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
    <>
      {loading ? (
        <ReactSlick {...settings}>
          <LoadingCardV1></LoadingCardV1>
          <LoadingCardV1></LoadingCardV1>
          <LoadingCardV1></LoadingCardV1>
          <LoadingCardV1></LoadingCardV1>
          <LoadingCardV1></LoadingCardV1>
          <LoadingCardV1></LoadingCardV1>
        </ReactSlick>
      ) : (
        <ReactSlick {...settings}>
          {movies.map((movie, id) => (
            <MovieCardV1 key={id} movie={movie}></MovieCardV1>
          ))}
        </ReactSlick>
      )}
    </>
  );
};

const settings = {
  dots: false,
  infinite: true,
  swipeToSlide: true,
  slidesToShow: 5,
  nextArrow: <RSNextArrow />,
  prevArrow: <RSPrevArrow />,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

HomeMovies.prototype = {
  movies: PropTypes.object,
};

export default withErrorBoundary(HomeMovies, {
  FallbackComponent: ErrorComponent,
});
