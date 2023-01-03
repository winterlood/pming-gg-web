import getOutJobPost from "@api/getOutJobPost";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api_types } from "@types";
import queryKey from "./key";

export default function useGetOutJobPostQuery<T = api_types.OutJobPost[]>(
  options?: UseQueryOptions<api_types.OutJobPost[]>
) {
  return useQuery<api_types.OutJobPost[]>(
    queryKey.getOutJobPost,
    () => getOutJobPost(),
    {
      ...options,
    }
  );
}
