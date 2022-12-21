import { RootState } from "@store/createStore";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function withOnlyGuest<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ProtectedComponent = ({ ...props }) => {
    const nav = useNavigate();
    const auth = useSelector((v: RootState) => v.auth);

    useEffect(() => {
      if (auth) {
        nav("/", { replace: true });
      }
    }, [auth]);
    return <WrappedComponent {...(props as P)} />;
  };
  return ProtectedComponent;
}

export default withOnlyGuest;
