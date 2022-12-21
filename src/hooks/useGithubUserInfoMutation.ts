import githubUserInfo from "@api/githubUserInfo";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useGithubUserInfoMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(githubUserInfo, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
