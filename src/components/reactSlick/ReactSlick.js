import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styled from "styled-components";

const StyledArrow = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.sizeLarge ? "50px" : "40px")};
  height: ${(props) => (props.sizeLarge ? "50px" : "40px")};
  border-radius: 50%;
  cursor: pointer;
  border: none;
  outline: none;
  top: ${(props) => (props.center ? "calc(50% - 2.125rem)" : "50%")};
  margin-top: -24px;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

const StyledNextArrow = styled(StyledArrow)`
  right: 20px;
`;

const StyledPrevArrow = styled(StyledArrow)`
  left: 20px;
`;

export const RSNextArrow = (props) => {
  const { onClick } = props;
  return (
    <StyledNextArrow
      onClick={onClick}
      center={props.center ? true : false}
      sizeLarge={props.sizeLarge ? true : false}
    >
      <BsChevronRight style={{ color: "var(--light)" }} />
    </StyledNextArrow>
  );
};

export const RSPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <StyledPrevArrow
      onClick={onClick}
      center={props.center ? true : false}
      sizeLarge={props.sizeLarge ? true : false}
    >
      <BsChevronLeft style={{ color: "var(--color-light)" }} />
    </StyledPrevArrow>
  );
};
