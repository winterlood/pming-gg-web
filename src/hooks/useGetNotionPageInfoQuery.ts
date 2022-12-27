import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import queryKey from "./key";

async function getNotionPageInfo(id: string): Promise<any> {
  return await fetch(`https://notion-api.splitbee.io/v1/table/${id}`)
    .then((res) => res.json())
    .then((data) => data)
    .then((data) => data.find((it: any) => it.id === id));
}

export default function useGetNotionPageInfoQuery<T = any>(
  id: string,
  options?: UseQueryOptions<T>
) {
  return useQuery<T>(
    queryKey.getNotionPageInfo(id),
    () => getNotionPageInfo(id),
    {
      ...options,
    }
  );
}
