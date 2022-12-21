import agent from "./agent";

export default function githubLogin(code: string) {
  return agent.get(`gh/login/${code}`);
}
