import createGithubProfile from "@api/createGithubProfile";
import createProfile from "@api/createProfile";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useCreategithubProfileMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(createGithubProfile, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
