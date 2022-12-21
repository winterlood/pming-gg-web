import { common_types } from "@types";
import agent from "./agent";

export default function updateProfile(
  params: common_types.IndividualUserInfo | common_types.BusinessUserInfo
) {
  return agent.put("profile", {
    ...params,
  });
}
