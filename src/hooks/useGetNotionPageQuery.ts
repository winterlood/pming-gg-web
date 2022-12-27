import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import queryKey from "./key";

async function getNotionPage(id: string): Promise<any> {
  return await fetch(`https://notion-api.splitbee.io/v1/page/${id}`)
    .then((res) => res.json())
    .then((data) => data);
}

export default function useGetNotionPageQuery<T = any>(
  id: string,
  options?: UseQueryOptions<T>
) {
  return useQuery<T>(queryKey.getNotionPage(id), () => getNotionPage(id), {
    ...options,
  });
}
