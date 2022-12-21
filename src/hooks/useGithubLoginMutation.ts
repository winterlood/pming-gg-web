import githubLogin from "@api/githubLogin";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useGithubLoginMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(githubLogin, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
