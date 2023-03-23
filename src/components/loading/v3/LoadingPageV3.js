import ErrorComponent from "components/common/ErrorComponent";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

const LoadingPageV3Styles = styled.div`
  height: 100vh;
  width: 100%;
  animation: loading 2s ease-in-out infinite;
  background-image: linear-gradient(
    90deg,
    hsla(248, 16%, 19%, 0.3) 25%,
    hsla(0, 56%, 53%, 0.25) 37%,
    hsla(248, 16%, 19%, 0.4) 63%
  );
  background-size: 400% 100%;
  border-radius: 0.5rem;
`;

const LoadingPageV3 = (props) => {
  return <LoadingPageV3Styles></LoadingPageV3Styles>;
};

export default withErrorBoundary(LoadingPageV3, {
  FallbackComponent: ErrorComponent,
});
