import getProfile from "@api/getProfile";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api_types } from "@types";
import queryKey from "./key";

export default function useGetProfileQuery<T = api_types.UserProfile>(
  id: string,
  options?: UseQueryOptions<api_types.UserProfile>
) {
  return useQuery<api_types.UserProfile>(
    queryKey.getProfile(id),
    () => getProfile(id),
    { ...options }
  );
}
