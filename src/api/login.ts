import agent from "./agent";

interface loginParams {
  email: string;
  password: string;
}
export default function login(params: loginParams) {
  return agent.post("auth/local?populate=*", {
    identifier: params.email,
    password: params.password,
  });
}
