import { useMutation, UseMutationResult } from "@tanstack/react-query";
import login from "@api/login";
import { AxiosError } from "axios";

export default function useLoginMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(login, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      switch (err as unknown as string) {
        case "Invalid identifier or password":
          alert("아이디와 비밀번호를 다시 확인하세요");
          break;
        case "Your account email is not confirmed":
          alert("이메일 인증이 완료되지 않았습니다");
          break;
        default:
          alert(
            "서버에 일시적인 문제가 발생하였습니다. 잠시 뒤에 시도해주세요"
          );
      }
      return err;
    },
  });
}
