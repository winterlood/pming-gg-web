import createApply from "@api/createApply";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useCreateApplyMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(createApply, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
