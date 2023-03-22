import ErrorComponent from "components/common/ErrorComponent";
import {
  ReactSlick,
  RSNextArrow,
  RSPrevArrow,
} from "components/reactSlick/ReactSlick";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CinemaList } from "utils/CinemaList";

const HomeCinemaStyles = {
  Logo: styled.img`
    width: 100px;
    height: 100px;
    margin: 0 auto;
    animation: fade-in 1s ease-in-out;
  `,
};

const HomeCinema = () => {
  return (
    <ReactSlick {...settings}>
      {CinemaList.map((cinema) => (
        <Link href={cinema.url} target="_blank" key={cinema.name}>
          <LazyLoadComponent>
            <HomeCinemaStyles.Logo
              src={cinema.src}
              alt={cinema.name}
              title={cinema.name}
            />
          </LazyLoadComponent>
        </Link>
      ))}
    </ReactSlick>
  );
};

const settings = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

export default withErrorBoundary(HomeCinema, {
  FallbackComponent: ErrorComponent,
});
