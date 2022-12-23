import getRecommendDevelopers from "@api/getRecommendDevelopers";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api_types } from "@types";
import queryKey from "./key";

export default function useGetRecommendDevlopers<T = api_types.UserProfile[]>(
  options?: UseQueryOptions<api_types.UserProfile[]>
) {
  return useQuery<api_types.UserProfile[]>(
    queryKey.getRecommendDevelopers,
    () => getRecommendDevelopers(),
    { ...options }
  );
}
