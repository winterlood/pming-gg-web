import createJobPost from "@api/createJobPost";
import deleteJobPost from "@api/deleteJobPost";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useDeleteJobPostMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(deleteJobPost, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
