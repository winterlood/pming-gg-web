import { useMutation, UseMutationResult } from "@tanstack/react-query";
import login from "@api/login";
import { AxiosError } from "axios";

export default function useLoginMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(login, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
