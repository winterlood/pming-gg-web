import getApply from "@api/getApply";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api_types } from "@types";
import queryKey from "./key";

export default function useGetApplyQuery<T = api_types.Apply[]>(
  id: string,
  options?: UseQueryOptions<api_types.Apply[]>
) {
  return useQuery<api_types.Apply[]>(
    queryKey.getApply(id),
    () => getApply(id),
    {
      ...options,
    }
  );
}
