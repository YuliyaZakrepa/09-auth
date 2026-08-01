"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getMe, checkSession } from "@/lib/api/clientApi";
import { ApiError } from "@/lib/api/api";
import toast from "react-hot-toast";
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  useEffect(() => {
    async function fetchUser() {
      try {
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getMe();
          if (user) {
            setUser(user);
          } else {
            clearIsAuthenticated();
          }
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        clearIsAuthenticated();
        const errorMsg =
          (error as ApiError).message ??
          (error as ApiError).response?.data?.error ??
          "Oops... some error";
        toast.error(`Auth check failed:${errorMsg}`);
      }
    }

    fetchUser();
  }, [clearIsAuthenticated, setUser]);
  return <>{children}</>;
}
