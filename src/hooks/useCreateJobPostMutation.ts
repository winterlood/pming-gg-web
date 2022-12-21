import createJobPost from "@api/createJobPost";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useCreateJobPostMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(createJobPost, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
