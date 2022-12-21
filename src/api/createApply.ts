import { api_types } from "@types";
import agent from "./agent";

export default function createApply(params: { jobPostId: string }) {
  return agent.post("apply", params);
}
