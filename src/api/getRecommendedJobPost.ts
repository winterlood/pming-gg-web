import { api_types, common_types } from "@types";
import agent from "./agent";

export default function getRecommendedJobPost(
  search?: string
): Promise<api_types.JobPost[]> {
  return agent
    .get(`jp/reco${search && `?search=${search}`}`)
    .then((res) => res.data);
}
