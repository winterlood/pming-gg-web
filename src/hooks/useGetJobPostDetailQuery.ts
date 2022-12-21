import getDetailJobPost from "@api/getDetailJobPost";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api_types } from "@types";
import queryKey from "./key";

export default function useGetJobPostDetailQuery<T = api_types.JobPost>(
  id: string,
  options?: UseQueryOptions<api_types.JobPost>
) {
  return useQuery<api_types.JobPost>(
    queryKey.getJobPostById(id),
    () => getDetailJobPost(id),
    { ...options }
  );
}
