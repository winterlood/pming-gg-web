import { api_types } from "@types";
import agent from "./agent";

export default function deleteApply(apply_id: string) {
  return agent.delete(`apply/${apply_id}`);
}
