import githubHistory from "@api/githubHistory";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { api_types } from "@types";
import { AxiosError } from "axios";

export default function useGithubHistoryMutation() {
  return useMutation(githubHistory, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
