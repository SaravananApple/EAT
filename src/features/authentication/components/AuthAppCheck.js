import React, { useContext } from "react";
import UserContext from "../../../context/UserContext.tsx";
import LoadingSpinner from "../../../components/routes/LoadingSpinner";

const AuthAppCheck = (props) => {
  const { publicApp, authApp } = props;

  const token = localStorage.getItem("jwt");

  const { authenticated, isLoading } = useContext(UserContext);

  if (isLoading)
    return (
      <div className="flex flex-column justify-content-center align-items-center p-8">
        <LoadingSpinner />
      </div>
    );
  if (token) return <>{authApp}</>;
  return <>{publicApp}</>;
};

export default AuthAppCheck;
