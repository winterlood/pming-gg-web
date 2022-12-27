import getMagazineList from "@api/getMagazineList";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api_types } from "@types";
import queryKey from "./key";

export default function useGetMagazineListQuery<T = api_types.Magazine[]>(
  options?: UseQueryOptions<api_types.Magazine[]>
) {
  return useQuery<api_types.Magazine[]>(
    queryKey.getMagazineList,
    () => getMagazineList(),
    { ...options }
  );
}
