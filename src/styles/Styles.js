import styled from "styled-components";
import { Breakpoints } from "./Breakpoint";

export const StyledBox = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("images/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fade-in 1s ease-in-out;
`;

export const StyledLogo = styled.h3`
  font-family: "Changa", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-red);
  text-transform: uppercase;
  display: inline-block;
`;

export const StyledButton = styled.button`
  font-family: "Poppins", sans-serif;
  background: var(--color-red);
  border: none;
  color: var(--text-light);
  border-radius: 0.5rem;
  padding: 0.8rem;
  font-weight: 700;
  font-size: 1.25rem;
  min-width: 150px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  z-index: 1;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  text-transform: ${(props) =>
    props.textTransform ? props.textTransform : "none"};
  ::after {
    content: "";
    z-index: -1;
    background-color: var(--color-magenta);
    position: absolute;
    top: -50%;
    bottom: -50%;
    width: 1.25em;
    transform: translate3d(-900%, 0, 0) rotate(35deg);
  }
  :hover::after {
    transition: transform 0.5s ease-in-out;
    transform: translate3d(300%, 0, 0) rotate(35deg);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  max-width: 1440px;
  padding: 1rem;
  animation: fade-in 1s ease-in-out 0s both;
  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

export const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => (props.admin ? "var(--text-light)" : "var(--color-red)")};
  padding: 1rem 0;
  ${Breakpoints.md} {
    font-size: 2rem;
  }
`;

export const CardHeight = styled.div`
  height: calc(((100vw - 5rem) / 2) * 1.5);
  @media (min-width: 768px) {
    height: calc(((100vw - 6rem) / 3) * 1.5);
  }
  @media (min-width: 1024px) {
    height: calc(((100vw - 7rem) / 4) * 1.5);
  }
  @media (min-width: 1440px) {
    height: calc(((1440px - 8rem) / 5) * 1.5);
  }
`;

export const GridCardV1 = styled.div`
  display: ${(props) => (props.grid ? "grid" : "none")};
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 2.5rem;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export const GridCardV2 = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    display: ${(props) => (props.grid ? "grid" : "none")};
  }
`;

export const SectionTitle = styled.h3`
  display: block;
  position: relative;
  line-height: 1.3;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: 0.5px;
  margin: ${(props) => (props.marginBottom ? "0 0 1rem 0" : "1rem 0")};
  &::after {
    content: "";
    display: block;
    width: ${(props) => props.w};
    height: 5px;
    margin-top: 0.5rem;
    background: var(--color-red);
  }
  ${Breakpoints.sm} {
    font-size: 1rem;
  }
`;
