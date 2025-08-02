import { useMutation } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { setToken } from "@/lib/cookies";
import type { User } from "@/types/user";
import type { LoginError, LoginRequest, LoginResponse } from "@/types/auth/login";
import useAuthStore from "@/stores/useAuthStore";

export default function useLoginMutation() {
  const { login } = useAuthStore();
  const navigate = useNavigate(); 

  const { mutate, isPending } = useMutation<
    AxiosResponse,
    AxiosError<LoginError>,
    LoginRequest
  >({
    mutationFn: async (data: LoginRequest) => {
      const res = await api.post<LoginResponse>("/user/login", data);
      const token = res.data.data.access_token;
      setToken(token);

      const user = await api.get<{ data: User }>("/user/me");

      if (user) login({ ...user.data.data, token: token });

      return res;
    },
    onSuccess: () => {
      const role = useAuthStore.getState().user?.role;
      if (!role) return;

      const redirect = "/dashboard";
      toast.success("Anda berhasil login");
      navigate(redirect);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data.error ||
          error?.response?.data.message ||
          error.message,
      );
    },
  });
  return { mutate, isPending };
}
