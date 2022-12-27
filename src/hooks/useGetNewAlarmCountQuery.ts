import getNewAlarmCount from "@api/getNewAlarmCount";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import queryKey from "./key";

export default function useGetNewAlarmCountQuery<T = number>(
  options?: UseQueryOptions<number>
) {
  return useQuery<number>(queryKey.getNewAlarmCount, () => getNewAlarmCount(), {
    ...options,
  });
}
