import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const MovieUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const dateFormat = "DD/MM/YYYY";
  return <div></div>;
};

export default withErrorBoundary(MovieUpdate, {
  FallbackComponent: ErrorComponent,
});
