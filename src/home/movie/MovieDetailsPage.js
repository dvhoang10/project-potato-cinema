import ErrorComponent from "components/common/ErrorComponent";
import { Cast, MovieModel } from "models/models";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";

const MovieDetailsPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
  return <div></div>;
};

export default withErrorBoundary(MovieDetailsPage, {
  FallbackComponent: ErrorComponent,
});
