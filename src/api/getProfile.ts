import { api_types } from "@types";
import agent from "./agent";

export default function getProfile(id: string): Promise<api_types.UserProfile> {
  return agent.get(`profile/${id}`, {}).then((res) => res.data);
}
