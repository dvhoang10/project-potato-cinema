import ErrorComponent from "components/common/ErrorComponent";
import { RSNextArrow, RSPrevArrow } from "components/reactSlick/ReactSlick";
import getVideoId from "get-video-id";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { setStatus } from "store/modelVideo/modalVideoSlice";
import styled from "styled-components";
import { BannerList } from "utils/BannerList";

const HomeBannerStyles = {
  Box: styled.div`
    position: relative;
  `,
  Backdrop: styled.div`
    background-image: url(${(props) => props.backdrop});
    width: 100vw;
    height: calc(100vw * 2 / 5);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: auto;
    @media (min-width: 1920px) {
      width: 1920px;
      height: 800px;
    }
  `,
  Content: styled.div`
    position: absolute;
    bottom: 10%;
    left: 10%;
    min-width: 300px;
  `,
  Name: styled.h4`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0;
  `,
  Tagline: styled.p`
    border-left: 3px solid var(--color-red);
    padding-left: 1rem;
    font-size: 1.25rem;
    font-weight: 400;
    font-style: italic;
    color: var(--color-red);
    font-family: "Changa", sans-serif;
    margin-bottom: 1rem;
  `,
  Background: styled.div`
    background: rgba(0, 0, 0, 0.75);
    padding: 1rem;
    border-radius: 8px;
  `,
  Button: styled.button`
    background: var(--color-red);
    border: 1px solid transparent;
    cursor: pointer;
    color: #fff;
    padding: 10px;
    width: auto;
    height: auto;
    border-radius: 6px;
  `,
  PlayTrailer: styled.span`
    font-weight: 600;
    font-size: 1rem;
  `,
  Slider: styled(Slider)`
    display: none;
    @media (min-width: 768px) {
      animation: fade-in 1s ease-in-out;
      display: block;
      max-width: 1920px;
      margin: auto;
      .slick-dots {
        bottom: 10px;
      }
      .slick-dots li.slick-active button:before {
        opacity: 1;
        color: var(--color-red);
      }
      .slick-dots li button:before {
        opacity: 0.8;
        color: var(--text-light);
        font-size: 0.8rem;
      }
    }
  `,
};

const HomeBanner = () => {
  const dispatch = useDispatch();
  return (
    <HomeBannerStyles.Slider {...settings}>
      {BannerList.map((banner) => (
        <HomeBannerStyles.Box key={banner.id}>
          <Link to={banner.link}>
            <HomeBannerStyles.Backdrop backdrop={banner.backdrop} />
          </Link>
          <HomeBannerStyles.Content>
            <HomeBannerStyles.Background>
              <HomeBannerStyles.Name>{banner.name}</HomeBannerStyles.Name>
              <HomeBannerStyles.Tagline>
                {banner.tagline}
              </HomeBannerStyles.Tagline>
              <HomeBannerStyles.Button
                bg="var(--color-red)"
                onClick={() => {
                  dispatch(
                    setStatus({
                      isOpen: true,
                      videoId: getVideoId(banner.trailer).id,
                    })
                  );
                }}
              >
                <HomeBannerStyles.PlayTrailer>
                  WATCH TRAILER
                </HomeBannerStyles.PlayTrailer>
              </HomeBannerStyles.Button>
            </HomeBannerStyles.Background>
          </HomeBannerStyles.Content>
        </HomeBannerStyles.Box>
      ))}
    </HomeBannerStyles.Slider>
  );
};

const settings = {
  dots: true,
  infinite: true,
  lazyLoad: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <RSNextArrow sizeLarge />,
  prevArrow: <RSPrevArrow sizeLarge />,
};

export default withErrorBoundary(HomeBanner, {
  FallbackComponent: ErrorComponent,
});
