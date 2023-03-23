import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";
import * as MovieCardV2Styles from "./MovieCardV2Styled";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const MovieCardV2 = ({ movie }) => {
  return (
    <MovieCardV2Styles.Card>
      <LazyLoadComponent>
        <MovieCardV2Styles.Wrapper>
          <Link to={`/movie/${movie.biDanh}-${movie.maPhim}/`} target="_top">
            <MovieCardV2Styles.Poster
              src={movie.hinhAnh !== "" ? movie.hinhAnh : "images/no-image.svg"}
              alt={movie.tenPhim}
              loading="lazy"
            />
          </Link>
          <MovieCardV2Styles.Content>
            <div>
              <Link
                to={`/movie/${movie.biDanh}-${movie.maPhim}/`}
                target="_top"
              >
                <MovieCardV2Styles.Name>{movie.tenPhim}</MovieCardV2Styles.Name>
              </Link>
              <MovieCardV2Styles.ReleaseDate>
                {dayjs(movie.ngayKhoiChieu).format("LL")}
              </MovieCardV2Styles.ReleaseDate>
            </div>
            <MovieCardV2Styles.Overview>
              {movie.moTa}
            </MovieCardV2Styles.Overview>
          </MovieCardV2Styles.Content>
        </MovieCardV2Styles.Wrapper>
      </LazyLoadComponent>
    </MovieCardV2Styles.Card>
  );
};

MovieCardV2.prototype = {
  movie: PropTypes.object,
  isSlick: PropTypes.bool,
};

export default withErrorBoundary(MovieCardV2, {
  FallbackComponent: ErrorComponent,
});
