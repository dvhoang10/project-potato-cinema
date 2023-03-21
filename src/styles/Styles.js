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
    transform: translate3d(-825%, 0, 0) rotate(35deg);
  }
  :hover::after {
    transition: transform 0.5s ease-in-out;
    transform: translate3d(300%, 0, 0) rotate(35deg);
  }
`;
