import { api_types } from "@types";
import agent from "./agent";

export default function getOutJobPost(): Promise<api_types.OutJobPost[]> {
  return agent.get(`jp/outjobpost`).then((res) => res.data);
}
