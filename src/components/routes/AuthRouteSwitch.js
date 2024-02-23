import React from "react";
import Routers from "./Routers";
import LoadingSpinner from "./LoadingSpinner";

const AuthRouteSwitch = () => {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Routers />
    </React.Suspense>
  );
};

export default AuthRouteSwitch;
