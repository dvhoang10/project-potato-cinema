import { Link } from "react-router-dom";
import styled from "styled-components";
import { CardHeight } from "styles/Styles";

export const Card = styled.div`
  background-color: var(--color-bg);
  border-radius: 8px;
  overflow: hidden;
  max-width: 100%;
`;

export const Rounded = styled.div`
  animation: fade-in 1s ease-in-out 0s both;
`;

export const Content = styled(CardHeight)`
  position: relative;
  overflow: hidden;
`;

export const Poster = styled.img`
  height: inherit;
  width: 100%;
  transition: transform 0.5s ease-in-out;
  ${Content}:hover & {
    transform: scale(1.1);
  }
`;

export const NoPoster = styled.img`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export const Play = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: var(--color-bg);
  visibility: hidden;
  ${Content}:hover & {
    visibility: visible;
  }
`;

export const Button = styled.button`
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  && svg {
    font-size: 3rem;
    color: var(--color-red);
    @media (min-width: 1440px) {
      font-size: 4rem;
    }
  }
`;

export const Info = styled.div`
  position: relative;
  height: 4.25rem;
  min-height: 4.25rem;
  background: var(--color-bg);
  padding: 0.25rem 0.5rem;
`;

export const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Name = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
`;

export const StyledLink = styled(Link)`
  position: absolute;
  font-size: 1rem;
  font-weight: 600;
  visibility: hidden;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #fff;
  transition: all 0.5s ease-in-out;
  background: var(--color-red);
  ${Info}:hover & {
    visibility: visible;
    color: #fff;
  }
`;
