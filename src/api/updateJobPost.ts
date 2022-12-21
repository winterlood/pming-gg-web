import { api_types } from "@types";
import agent from "./agent";

export default function updateJobPost(
  params: api_types.JobPost & { id: string }
) {
  return agent.put(`jp`, params);
}
