import { RootState } from "@store/createStore";
import { common_types } from "@types";
import { useSelector } from "react-redux";

export default function useAuthUser(): common_types.AuthUser {
  const auth = useSelector((v: RootState) => v.auth) as common_types.AuthUser;

  return auth;
}
