import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import PropTypes from "prop-types";
import { GridCardV1 } from "styles/Styles";
import LoadingCardV1 from "./LoadingCardV1";

const LoadingPageV1 = (props) => {
  return (
    <GridCardV1 grid={props.grid ? true : false}>
      {Array(20)
        .fill(0)
        .map((item, index) => (
          <LoadingCardV1 key={index}></LoadingCardV1>
        ))}
    </GridCardV1>
  );
};

LoadingPageV1.prototype = {
  props: PropTypes.object,
};

export default withErrorBoundary(LoadingPageV1, {
  FallbackComponent: ErrorComponent,
});
