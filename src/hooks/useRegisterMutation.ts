import { useMutation, UseMutationResult } from "@tanstack/react-query";
import register from "@api/register";
import { AxiosError } from "axios";

export default function useRegisterMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(register, {
    onSuccess: (data) => {},
    onError: (err) => {
      switch (err as unknown as string) {
        case "Email or Username are already taken":
          alert("이메일이나 닉네임이 이미 존재합니다");
          break;
        default:
          alert(
            "서버에 일시적인 오류가 발생하였습니다. 잠시 후 다시 시도해주세요"
          );
      }
    },
  });
}
