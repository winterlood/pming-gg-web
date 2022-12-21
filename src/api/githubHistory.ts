import { api_types } from "@types";
import agent from "./agent";

export default function githubHistory({
  access_token,
  token_type,
  login,
}: {
  access_token: string;
  token_type: string;
  login: string;
}): Promise<api_types.GitHubHistory> {
  return agent
    .post(`gh/history`, {
      access_token,
      token_type,
      login,
    })
    .then((data) => data.data);
}
