import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import { CardHeight } from "styles/Styles";

const LoadingCardStyles = styled(CardHeight)`
  width: 100%;
  border-radius: 0.5rem;
  background-size: 400% 100%;
  animation: loading 2s ease-in-out infinite;
  background-image: linear-gradient(
    90deg,
    hsla(248, 16%, 19%, 0.3) 25%,
    hsla(0, 56%, 53%, 0.25) 37%,
    hsla(248, 16%, 19%, 0.4) 63%
  );
`;

const LoadingCardV1 = () => {
  return <LoadingCardStyles></LoadingCardStyles>;
};

export default withErrorBoundary(LoadingCardV1, {
  FallbackComponent: ErrorComponent,
});
