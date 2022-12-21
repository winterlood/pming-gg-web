import createProfile from "@api/createProfile";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useCreateProfileMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(createProfile, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
