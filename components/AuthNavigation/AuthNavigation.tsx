"use client";
import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import { ApiError } from "@/lib/api/api";
import toast from "react-hot-toast";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated} =
    useAuthStore();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push("/sign-in");
    } catch (error) {
      const errorMessage =
        (error as ApiError).message ??
        (error as ApiError).response?.data?.error ??
        "Oops... some error";
      toast(errorMessage);
    }
  };
  
  if (isAuthenticated !== true) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
            Login
          </Link>
        </li>

        <li className={css.navigationItem}>
          <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
            Sign up
          </Link>
        </li>
      </>
    );
  }
  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  );
}
