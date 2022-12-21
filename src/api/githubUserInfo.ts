import agent from "./agent";

export default function githubUserInfo({
  access_token,
  token_type,
}: {
  access_token: string;
  token_type: string;
}) {
  return agent.post(`gh/user`, {
    access_token,
    token_type,
  });
}
