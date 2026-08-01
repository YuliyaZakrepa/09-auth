"use client";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api/api";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Edit() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser); 
  const router = useRouter();
  const [userName, setUserName] = useState(user?.username || "");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userName.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
    try {
      const updateUser = await updateMe({ username: userName });
      setUser(updateUser);
      toast.success("Profile updated successfully");
      router.push("/profile");
    } catch (error) {
      const errorMsg =
        (error as ApiError).message ??
        (error as ApiError).response?.data?.error ??
        "Oops... some error";

      toast.error(`Failed to update profile: ${errorMsg}`);
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user?.avatar || "https://goit.global"}
          alt={user?.avatar || "User Avatar"}
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {user?.username}</label>
            <input
              id="username"
              onChange={handleChange}
              type="text"
              name="username"
              defaultValue={userName}
              className={css.input}
              />
          </div>
          <p>Email: {user?.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
