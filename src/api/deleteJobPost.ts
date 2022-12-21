import agent from "./agent";

export default function deleteJobPost(id: string) {
  return agent.delete(`jp/${id}`);
}
