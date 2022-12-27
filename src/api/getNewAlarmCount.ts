import agent from "./agent";

export default function getNewAlarmCount(): Promise<number> {
  return agent.get(`alarm/new`).then((res) => res.data);
}
