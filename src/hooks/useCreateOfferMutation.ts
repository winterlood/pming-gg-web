import createOffer from "@api/createOffer";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useCreateOfferMutation(): UseMutationResult<
  any,
  AxiosError,
  any
> {
  return useMutation(createOffer, {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
}
