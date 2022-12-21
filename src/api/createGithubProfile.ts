import { api_types, common_types } from "@types";
import agent from "./agent";

export default function createGithubProfile(params: api_types.GitHubHistory) {
  return agent.post("gh/profile", params);
}
