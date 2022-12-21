import { api_types, common_types } from "@types";
import agent from "./agent";

export default function getJobPostByUserId(
  id: string
): Promise<api_types.JobPost[]> {
  return agent.get(`jp/user/${id}`).then((res) => res.data);
}
