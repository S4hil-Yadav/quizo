import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { TypeUser } from "../types";

export function useSignupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userFields,
    }: {
      userFields: Omit<TypeUser, "profilePicture">;
    }) => axiosInstance.post("/api/v1/auth/signup", { userFields }),
    onSuccess: () => {
      toast.success("Signup successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userFields,
    }: {
      userFields: Omit<TypeUser, "fullname" | "username" | "profilePicture">;
    }) => axiosInstance.post("/api/v1/auth/login", { userFields }),
    onSuccess: () => {
      toast.success("Login successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient(),
    navigate = useNavigate();

  return useMutation({
    mutationFn: () => axiosInstance.post("/api/v1/auth/logout"),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
      toast.success("Logged out");
      navigate("/login");
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      axiosInstance.put("/api/v1/auth", formData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Profile updated");
    },

    onError: () => {},
  });
}
