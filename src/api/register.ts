import agent from "./agent";

interface registerParams {
  username: string;
  email: string;
  password: string;
}
export default function register(params: registerParams) {
  return agent.post("auth/local/register", {
    ...params,
  });
}
