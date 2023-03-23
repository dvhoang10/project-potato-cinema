import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import PropTypes from "prop-types";
import { GridCardV2 } from "styles/Styles";
import LoadingCardV2 from "./LoadingCardV2";

const LoadingPageV2 = (props) => {
  return (
    <GridCardV2 grid={props.grid ? true : false}>
      {Array(20)
        .fill(0)
        .map((item, index) => (
          <LoadingCardV2 key={index}></LoadingCardV2>
        ))}
    </GridCardV2>
  );
};

LoadingPageV2.prototype = {
  props: PropTypes.object,
};

export default withErrorBoundary(LoadingPageV2, {
  FallbackComponent: ErrorComponent,
});
