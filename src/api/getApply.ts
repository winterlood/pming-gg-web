import { api_types } from "@types";
import agent from "./agent";

export default function getApply(id: string): Promise<api_types.Apply[]> {
  return agent.get(`apply/${id}`).then((res) => res.data);
}
