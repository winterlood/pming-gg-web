import { api_types } from "@types";
import agent from "./agent";

export default function createOffer(params: {
  offer_job_post_id: string;
  offer_message: string;
  offer_received_user_id: string;
}) {
  return agent.post("offer", params);
}
