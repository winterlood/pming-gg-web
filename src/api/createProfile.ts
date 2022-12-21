import { common_types } from "@types";
import agent from "./agent";

export default function createProfile(
  params: common_types.IndividualUserInfo | common_types.BusinessUserInfo
) {
  return agent.post("profile", {
    ...params,
  });
}
