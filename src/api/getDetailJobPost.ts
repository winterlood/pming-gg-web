import { api_types, common_types } from "@types";
import agent from "./agent";

export default function getDetailJobPost(
  id: string
): Promise<api_types.JobPost> {
  return agent.get(`jp/${id}`).then((res) => res.data);
}
