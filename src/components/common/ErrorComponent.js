import React from "react";
import styled from "styled-components";

const ErrorComponentStyles = styled.div`
  padding: 1.25rem;
  color: var(--color-red);
  background: var(--color-bg);
  border-radius: 0.5rem;
`;

const ErrorComponent = () => {
  return <ErrorComponentStyles>Component is error</ErrorComponentStyles>;
};

export default ErrorComponent;
