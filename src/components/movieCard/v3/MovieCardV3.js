import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";
import * as MovieCardV3Styles from "../v2/MovieCardV2Styled";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import dayjs from "dayjs";
import { TMDB_IMG_POSTER_URL } from "utils/config";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const MovieCardV3 = ({ movie, display }) => {
  return (
    <MovieCardV3Styles.Card display={display}>
      <LazyLoadComponent>
        <MovieCardV3Styles.Wrapper>
          <MovieCardV3Styles.Poster
            src={
              movie.poster_path !== null
                ? TMDB_IMG_POSTER_URL + movie.poster_path
                : "images/no-image.svg"
            }
            alt={movie.title}
            loading="lazy"
          />
          <MovieCardV3Styles.Content>
            <div>
              <MovieCardV3Styles.Name>{movie.title}</MovieCardV3Styles.Name>
              <MovieCardV3Styles.ReleaseDate>
                {dayjs(movie.release_date).format("LL")}
              </MovieCardV3Styles.ReleaseDate>
            </div>
            <MovieCardV3Styles.Overview>
              {movie.overview}
            </MovieCardV3Styles.Overview>
          </MovieCardV3Styles.Content>
        </MovieCardV3Styles.Wrapper>
      </LazyLoadComponent>
    </MovieCardV3Styles.Card>
  );
};

MovieCardV3.prototype = {
  movie: PropTypes.object,
  isSlick: PropTypes.bool,
};

export default withErrorBoundary(MovieCardV3, {
  FallbackComponent: ErrorComponent,
});
