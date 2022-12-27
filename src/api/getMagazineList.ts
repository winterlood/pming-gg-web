import { api_types } from "@types";
import agent from "./agent";

export default function getMagazineList(): Promise<api_types.Magazine[]> {
  return agent.get(`magazine`).then((res) => res.data);
}
