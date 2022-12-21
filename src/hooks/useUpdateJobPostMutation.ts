import updateJobPost from "@api/updateJobPost";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useUpdateJobPostMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(updateJobPost, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
