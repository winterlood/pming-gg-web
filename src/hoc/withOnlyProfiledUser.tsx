import { RootState } from "@store/createStore";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function withOnlyProfiledUser<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ProtectedComponent = ({ ...props }) => {
    const nav = useNavigate();
    const auth = useSelector((v: RootState) => v.auth);

    useEffect(() => {
      if (!auth) {
        nav("/login", { replace: true });
      } else if (!auth.user.is_profile_created) {
        nav("/profile/create", { replace: true });
      }
    }, [auth]);

    return <WrappedComponent {...(props as P)} />;
  };
  return ProtectedComponent;
}

export default withOnlyProfiledUser;
