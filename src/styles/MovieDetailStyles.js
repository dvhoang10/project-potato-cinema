import styled from "styled-components";

export const BackDrop = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  animation: fade-in 1s ease-in-out 0s both;
  @media (min-width: 1024px) {
    background-position: right -200px top;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: linear-gradient(
      to right,
      rgba(38, 38, 38, 1) 20%,
      rgba(7.84%, 1.18%, 1.96%, 0.7) 50%
    );
  }
`;

export const Background = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (min-width: 1024px) {
    background-image: linear-gradient(
      to right,
      rgba(38, 38, 38, 1) 200px,
      rgba(7.84%, 1.18%, 1.96%, 0.7) 50%
    );
  }
`;

export const Wrapper = styled.div`
  background-color: transparent;
  padding: 0;
  @media (min-width: 1024px) {
    padding: 30px 40px;
  }
`;

export const Content = styled.section`
  display: block;
  height: auto;
  width: 100%;
  min-width: 100%;
  @media (min-width: 1024px) {
    display: flex;
    flex-wrap: nowrap;
  }
`;

export const PosterWrapper = styled.div`
  height: auto;
  min-width: 100vw;
  width: 100vw;
  @media (min-width: 1024px) {
    border-width: 0px;
    min-width: 300px;
    width: 300px;
    height: 450px;
    overflow: hidden;
    border-radius: 8px;
  }
`;

export const PosterWrapperContent = styled.div`
  min-width: 100vw;
  width: 100vw;
  height: calc(100vw / 2.222222);
  position: relative;
  top: 0;
  left: 0;
  display: block;
  @media (min-width: 1024px) {
    min-width: 300px;
    width: 300px;
    height: 450px;
    position: relative;
    top: 0;
    left: 0;
    display: block;
  }
`;

export const PosterContent = styled.div`
  background-image: linear-gradient(
    to right,
    rgba(38, 38, 38, 1) 20%,
    rgba(7.84%, 1.18%, 1.96%, 0.7) 50%
  );
  background-position: calc((((100vw / 2.222222) - 20px) / 1.5) / 2) 0;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  min-width: 100%;
  height: 100%;
  position: relative;
  animation: fade-in 1s ease-in-out 0s both;
  @media (min-width: 1024px) {
    width: 300px;
    height: 450px;
    background-image: none;
  }
`;

export const Poster = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: calc(((100vw / 2.222222) - 40px) / 1.5);
  height: calc((100vw / 2.222222) - 40px);
  border-radius: 8px;
  z-index: 4;
  animation: zoom-left 1s ease-in-out 0s;
  background: var(--color-primary);
  @media (min-width: 1024px) {
    position: unset;
    display: block;
    width: 100%;
    height: 100%;
    border-width: 0px;
    outline: none;
    top: 0;
    left: 0;
  }
`;

export const BackgroundGradient = styled.div`
  background-image: linear-gradient(
    to right,
    rgba(9.8%, 9.41%, 9.02%, 1) 20%,
    rgba(9.8%, 9.41%, 9.02%, 0) 50%
  );
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const Play = styled.div`
  display: none;
  @media (min-width: 1024px) {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    visibility: hidden;
    ${PosterContent}:hover & {
      visibility: visible;
    }
  }
`;

export const Button = styled.button`
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  && svg {
    font-size: 5rem;
    color: var(--color-red);
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const InfoContent = styled.div`
  position: relative;
  bottom: 0;
  top: 0;
  float: none;
  box-sizing: border-box;
  padding-left: 0;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding-left: 40px;
    row-gap: 1rem;
  }
`;

export const Name = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 0;
  text-align: center;
  color: var(--text-light);
  @media (max-width: 900px) {
    font-size: 2rem;
  }
`;

export const Flex = styled.div`
  display: flex;
`;

export const Fact = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

export const Release = styled.span``;

export const Rate = styled.span`
  position: relative;
  padding-left: 20px;
  &&::after {
    content: "\u2022";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 7px;
  }
`;

export const RateIcon = styled.span`
  position: absolute;
  top: 2px;
  left: 40px;
`;

export const Trailer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const ButtonTrailer = styled.button`
  background: var(--color-red);
  border: 1px solid transparent;
  cursor: pointer;
  color: #fff;
  padding: 0.5rem 1rem;
  width: auto;
  height: auto;
  border-radius: 0.5rem;
`;

export const PlayTrailer = styled.span`
  font-weight: 600;
`;

export const Overview = styled.p``;

export const OverviewContent = styled.div`
  padding: 1rem;

  @media (min-width: 1024px) {
    padding: 0;
  }
`;

export const Showtime = styled.div`
  margin: 1.25rem 0;
  padding: 20px 20px 20px 0;
  border-radius: 8px;
  background: var(--color-secondary);
`;

export const NoShowtime = styled.p`
  font-size: 1rem;
  text-align: center;
  margin: 1rem 0;
`;

export const CinemaLogo = styled.img`
  width: 50px;
`;

export const Cinema = styled.div`
  padding: 1rem 0;
  border-bottom-width: 2px;
  &:last-child {
    border: none;
  }
  &:first-child {
    padding-top: 0;
  }
  color: white;
`;

export const CinemaName = styled.p`
  font-size: calc(0.8rem + 0.8vw);
  font-weight: 600;
  color: var(--color-red);
  margin-bottom: 0.5rem;
`;

export const CinemaShowtime = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  gap: 0.5rem;
`;

export const Checkout = styled.div`
  grid-column: span 1 / span 1;
  text-align: center;
`;

export const ShowtimeLink = styled.button`
  position: relative;
  z-index: 1;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: -0.25em;
    right: -0.25em;
    background-color: var(--color-red);
    transform-origin: center right;
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
  }
  :hover::before {
    transform: scaleX(1);
    transform-origin: center left;
  }
`;

export const MovieName = styled.span`
  color: var(--color-red);
  font-family: inherit;
  font-size: inherit;
`;
