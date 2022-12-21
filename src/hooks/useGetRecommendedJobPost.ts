import getRecommendedJobPost from "@api/getRecommendedJobPost";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api_types } from "@types";
import queryKey from "./key";

export default function useGetRecommendedJobPost<T = api_types.JobPost[]>(
  search?: string,
  options?: UseQueryOptions<api_types.JobPost[]>
) {
  return useQuery<api_types.JobPost[]>(
    queryKey.getRecommendedJobPost(search),
    () => getRecommendedJobPost(search),
    { ...options }
  );
}
