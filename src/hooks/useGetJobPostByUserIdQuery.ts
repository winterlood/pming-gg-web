import getJobPostByUserId from "@api/getJobPostByUserId";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api_types } from "@types";
import queryKey from "./key";

export default function useGetJobPostByUserIdQuery<T = api_types.JobPost[]>(
  id: string,
  options?: UseQueryOptions<api_types.JobPost[]>
) {
  return useQuery<api_types.JobPost[]>(
    queryKey.getJobPostByUserId(id),
    () => getJobPostByUserId(id),
    { ...options }
  );
}
