import { api_types } from "@types";
import agent from "./agent";

export default function getApply(
  apply_user_id?: string,
  author_user_id?: string,
  job_post_id?: string
): Promise<api_types.Apply[]> {
  return agent
    .get(`apply`, {
      params: {
        apply_user_id,
        author_user_id,
        job_post_id,
      },
    })
    .then((res) => res.data);
}
