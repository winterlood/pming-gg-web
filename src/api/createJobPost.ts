import { api_types, common_types } from "@types";
import agent from "./agent";

export default function createJobPost(params: api_types.JobPost) {
  return agent.post("jp", params);
}
