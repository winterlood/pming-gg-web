import { api_types } from "@types";
import agent from "./agent";

export default function getOffer(
  offer_send_user_id?: string,
  offer_received_user_id?: string,
  job_post_id?: string
): Promise<api_types.JobOffer[]> {
  return agent
    .get(`offer`, {
      params: {
        offer_send_user_id,
        offer_received_user_id,
        job_post_id,
      },
    })
    .then((res) => res.data);
}
