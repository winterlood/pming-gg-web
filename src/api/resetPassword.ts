import agent from "./agent";

interface IBody {
  code: string;
  password: string;
  passwordConfirmation: string;
}
export default function resetPassword(body: IBody) {
  return agent.post("auth/reset-password", {
    ...body,
  });
}
