import React from "react";
import { Routes, Route, Navigate } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import Login from "../../Login";
import Register from "../../Register";

const PublicRouteSwitch = () => {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/Register" Component={Register} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </React.Suspense>
  );
};

export default PublicRouteSwitch;
