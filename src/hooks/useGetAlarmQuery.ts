import getAlarms from "@api/getAlarms";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api_types } from "@types";
import queryKey from "./key";

export default function useGetAlarmQuery<T = api_types.Alarm[]>(
  options?: UseQueryOptions<api_types.Alarm[]>
) {
  return useQuery<api_types.Alarm[]>(queryKey.getAlarms, () => getAlarms(), {
    ...options,
  });
}
