import getApply from "@api/getApply";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api_types } from "@types";
import queryKey from "./key";

interface ApplyQueryParams {
  apply_user_id?: string;
  author_user_id?: string;
  job_post_id?: string;
}

export default function useGetApplyQuery<T = api_types.Apply[]>(
  { apply_user_id, author_user_id, job_post_id }: ApplyQueryParams,
  options?: UseQueryOptions<api_types.Apply[]>
) {
  return useQuery<api_types.Apply[]>(
    queryKey.getApply(apply_user_id, author_user_id, job_post_id),
    () => getApply(apply_user_id, author_user_id, job_post_id),
    {
      ...options,
    }
  );
}
