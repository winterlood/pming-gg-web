import updateProfile from "@api/updateProfile";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useUpdateProfileMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(updateProfile, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
