import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

const LoadingCardStyles = styled.div`
  height: 250px;
  width: 100%;
  animation: loading 2s ease-in-out infinite;
  background-image: linear-gradient(
    90deg,
    hsla(248, 16%, 19%, 0.3) 25%,
    hsla(0, 56%, 53%, 0.25) 37%,
    hsla(248, 16%, 19%, 0.4) 63%
  );
  background-size: 400% 100%;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
`;

const LoadingCardV2 = () => {
  return <LoadingCardStyles></LoadingCardStyles>;
};

export default withErrorBoundary(LoadingCardV2, {
  FallbackComponent: ErrorComponent,
});
