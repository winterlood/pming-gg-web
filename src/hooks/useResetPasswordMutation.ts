import resetPassword from "@api/resetPassword";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function useResetPasswordMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  const nav = useNavigate();
  return useMutation(resetPassword, {
    onSuccess: (data) => {
      alert("비밀번호가 재 설정되었습니다.");
      nav(`/login`, { replace: true });
    },
    onError: (data) => {
      alert("서버에 오류가 발생했습니다.");
    },
  });
}
