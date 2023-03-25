import ErrorComponent from "components/common/ErrorComponent";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return <div>Dashboard</div>;
};

export default withErrorBoundary(Dashboard, {
  FallbackComponent: ErrorComponent,
});
