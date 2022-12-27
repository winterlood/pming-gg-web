import { api_types } from "@types";
import agent from "./agent";

export default function getAlarms(): Promise<api_types.Alarm[]> {
  return agent.get(`alarm`).then((res) => res.data);
}
