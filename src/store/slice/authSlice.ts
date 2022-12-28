import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { common_types } from "@types";

function getAuth() {
  try {
    const auth = JSON.parse(localStorage.getItem("auth") as string);
    if (!auth) return null;
    return auth;
  } catch (err) {
    return null;
  }
}

type AuthType = common_types.AuthUser | null;

const authSlice = createSlice({
  name: "auth",
  initialState: getAuth() as AuthType,
  reducers: {
    login: (_, action: PayloadAction<common_types.AuthUser>) => {
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return action.payload;
    },
    logout: () => {
      localStorage.removeItem("auth");
      return null;
    },
    toggleIsProfileCreated: (
      state,
      action: PayloadAction<{ user_type: common_types.UserType }>
    ) => {
      const newState = {
        ...state,
        user: {
          ...state?.user,
          is_profile_created: true,
          user_type: action.payload.user_type,
        },
      } as common_types.AuthUser;
      localStorage.setItem("auth", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { login, logout, toggleIsProfileCreated } = authSlice.actions;
export default authSlice.reducer;
