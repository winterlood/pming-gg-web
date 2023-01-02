import agent from "./agent";

interface IBody {
  email: string;
}
export default function forgotPassword(body: IBody) {
  return agent.post("auth/forgot-password", {
    email: body.email,
  });
}
