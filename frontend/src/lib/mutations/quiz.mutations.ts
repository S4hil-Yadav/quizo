import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../axios";
import { TypeUser, TypeQuiz } from "../types";
import { useDispatch } from "react-redux";
import { clearQuizDraft } from "@/redux/quizDraft/quizDraftSlice";

export function useCreateQuizMutation() {
  const queryClient = useQueryClient(),
    authUser: TypeUser | undefined = queryClient.getQueryData(["authUser"]);

  const dispatch = useDispatch();

  return useMutation({
    mutationFn: ({ quiz }: { quiz: TypeQuiz }) =>
      axiosInstance.post("/api/v1/quizes", { quiz }),
    onSuccess: () => {
      toast.success("Quiz created");
      queryClient.invalidateQueries({ queryKey: ["quizes", authUser!.id] });
      dispatch(clearQuizDraft());
    },
  });
}

export function useUpdateQuizMutation() {
  const queryClient = useQueryClient(),
    authUser: TypeUser | undefined = queryClient.getQueryData(["authUser"]);

  return useMutation({
    mutationFn: ({ newQuiz }: { newQuiz: TypeQuiz }) =>
      axiosInstance.put("/api/v1/quizes/" + newQuiz.id, { newQuiz }),
    onSuccess: () => {
      toast.success("Quiz updated");
      queryClient.invalidateQueries({ queryKey: ["quizes", authUser!.id] });
    },
  });
}

export function useDeleteQuizMutation() {
  const queryClient = useQueryClient(),
    authUser: TypeUser | undefined = queryClient.getQueryData(["authUser"]);

  return useMutation({
    mutationFn: ({ quizId }: { quizId: string }) =>
      axiosInstance.delete("/api/v1/quizes/" + quizId),
    onSuccess: async () => {
      toast.success("Quiz deleted");
      await queryClient.invalidateQueries({
        queryKey: ["quizes", authUser?.id],
      });
    },
  });
}
