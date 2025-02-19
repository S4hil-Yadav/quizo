import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosInstance from "../axios";

export function useGetAuthQuery() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: () =>
      axiosInstance
        .get("/auth", { withCredentials: true })
        .then((res) => res.data),

    refetchOnReconnect: true,
    retry: (count, err) => {
      if (err instanceof AxiosError)
        return count < 3 && err.response?.status === 500;
      return false;
    },
  });
}
