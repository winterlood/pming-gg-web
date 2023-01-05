import withOnlyAuthUser from "@hoc/withOnlyAuthUser";
import Layout from "@layout/Layout";
import { useAppDispatch } from "@store/createStore";
import { logout } from "@store/slice/authSlice";
import { useEffect } from "react";

export default withOnlyAuthUser(function LogoutPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);
  return (
    <Layout
      header={{
        pageName: "로그아웃",
      }}
    >
      <div>로그아웃 ...</div>
    </Layout>
  );
});
