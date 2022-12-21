import uploadFile from "@api/uploadFile";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useUploadFileMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(uploadFile, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
