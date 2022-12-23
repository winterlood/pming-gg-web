import getOffer from "@api/getOffer";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api_types } from "@types";
import queryKey from "./key";

interface JobOfferQueryParams {
  offer_send_user_id?: string;
  offer_received_user_id?: string;
}

export default function useGetOfferQuery<T = api_types.JobOffer[]>(
  { offer_send_user_id, offer_received_user_id }: Partial<JobOfferQueryParams>,
  options?: UseQueryOptions<api_types.JobOffer[]>
) {
  return useQuery<api_types.JobOffer[]>(
    queryKey.getOffer(offer_send_user_id, offer_received_user_id),
    () => getOffer(offer_send_user_id, offer_received_user_id),
    {
      ...options,
    }
  );
}
