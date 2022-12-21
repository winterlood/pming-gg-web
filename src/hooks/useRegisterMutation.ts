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
    onError: (data) => {},
  });
}
