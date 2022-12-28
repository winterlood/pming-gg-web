import { RootState } from "@store/createStore";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function withOnlyProfiledUser<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ProtectedComponent = ({ ...props }) => {
    const auth = useSelector((v: RootState) => v.auth);
    if (!auth) {
      return <Navigate replace to="/login" />;
    } else if (!auth.user.is_profile_created) {
      return <Navigate replace to="/profile/create" />;
    } else {
      return <WrappedComponent {...(props as P)} />;
    }
  };
  return ProtectedComponent;
}

export default withOnlyProfiledUser;
