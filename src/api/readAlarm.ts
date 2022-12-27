import agent from "./agent";

export default function readAlarm(id: string) {
  return agent.get(`alarm/read/${id}`);
}
