import { api_types } from "@types";
import agent from "./agent";

export default function getRecommendDevelopers(): Promise<
  api_types.UserProfile[]
> {
  return agent.get(`developer/reco`, {}).then((res) => res.data);
}
