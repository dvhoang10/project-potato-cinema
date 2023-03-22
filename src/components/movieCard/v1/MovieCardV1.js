import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import * as MovieCardV1Styles from "./MovieCardV1Styled";
import PropTypes from "prop-types";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setStatus } from "store/modelVideo/modalVideoSlice";
import getVideoId from "get-video-id";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const MovieCardV1 = ({ movie }) => {
  const dispatch = useDispatch();
  return (
    <MovieCardV1Styles.Card>
      <LazyLoadComponent>
        <MovieCardV1Styles.Rounded>
          <MovieCardV1Styles.Content>
            {movie.hinhAnh !== "" ? (
              <MovieCardV1Styles.Poster
                src={movie.hinhAnh}
                alt={movie.tenPhim}
                loading="lazy"
              />
            ) : (
              <MovieCardV1Styles.NoPoster
                src="images/no-image.svg"
                alt="no-image"
                loading="lazy"
              />
            )}
            <MovieCardV1Styles.Play>
              <MovieCardV1Styles.Button
                onClick={() => {
                  dispatch(
                    setStatus({
                      isOpen: true,
                      videoId: getVideoId(movie.trailer).id,
                    })
                  );
                }}
              >
                <FaPlay />
              </MovieCardV1Styles.Button>
            </MovieCardV1Styles.Play>
          </MovieCardV1Styles.Content>
          <MovieCardV1Styles.Info>
            <MovieCardV1Styles.Flex>
              <MovieCardV1Styles.Name>{movie.tenPhim}</MovieCardV1Styles.Name>
            </MovieCardV1Styles.Flex>
            {movie.dangChieu ? (
              <MovieCardV1Styles.StyledLink
                to={`/movie/${movie.biDanh}-${movie.maPhim}/`}
                target="_top"
              >
                GET TICKETS
              </MovieCardV1Styles.StyledLink>
            ) : (
              <MovieCardV1Styles.StyledLink
                to={`/movie/${movie.biDanh}-${movie.maPhim}/`}
                target="_top"
              >
                MORE INFO
              </MovieCardV1Styles.StyledLink>
            )}
          </MovieCardV1Styles.Info>
        </MovieCardV1Styles.Rounded>
      </LazyLoadComponent>
    </MovieCardV1Styles.Card>
  );
};

MovieCardV1.prototype = {
  movie: PropTypes.object,
  isSlick: PropTypes.bool,
};

export default withErrorBoundary(MovieCardV1, {
  FallbackComponent: ErrorComponent,
});
