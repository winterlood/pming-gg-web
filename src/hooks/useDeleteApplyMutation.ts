import deleteApply from "@api/deleteApply";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useDeleteApplyMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(deleteApply, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
