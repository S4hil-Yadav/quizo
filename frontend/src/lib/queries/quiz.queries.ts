import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { TypeUser } from "../types";

export function useGetQuizesQuery() {
  const queryClient = useQueryClient(),
    authUser: TypeUser | undefined = queryClient.getQueryData(["authUser"]);

  return useQuery({
    queryKey: ["quizes", authUser?.id],
    queryFn: () => axiosInstance.get("/quizes").then((res) => res.data),
    enabled: !!authUser?.id,
  });
}

export function useGetQuizQuery({ quizId }: { quizId: string }) {
  const queryClient = useQueryClient(),
    authUser: TypeUser | undefined = queryClient.getQueryData(["authUser"]);

  return useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () =>
      axiosInstance.get("/quizes/" + quizId).then((res) => res.data),
    enabled: !!authUser?.id,
  });
}
