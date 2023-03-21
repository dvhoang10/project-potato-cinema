import styled, { css } from "styled-components";
import { Breakpoints } from "./Breakpoint";

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
