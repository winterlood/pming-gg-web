import getProfile from "@api/getProfile";
import uploadFile from "@api/uploadFile";
import {
  QueryObserver,
  QueryObserverOptions,
  QueryOptions,
  UseBaseQueryOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { api_types } from "@types";
import { AxiosError } from "axios";
import queryKey from "./key";

export default function useGetProfileQuery<T = api_types.UserProfile>(
  id: string,
  options?: UseQueryOptions<api_types.UserProfile>
) {
  return useQuery<api_types.UserProfile>(
    queryKey.getProfile(id),
    () => getProfile(id),
    { ...options }
  );
}
