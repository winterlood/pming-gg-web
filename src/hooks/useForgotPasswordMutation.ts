import forgotPassword from "@api/forgotPassword";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useForgotPasswordMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(forgotPassword, {
    onSuccess: (data) => {
      alert("비밀번호 재 설정 링크를 메일로 발송했습니다.");
    },
    onError: (data) => {
      alert("서버에 오류가 발생했습니다.");
    },
  });
}
