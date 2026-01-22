"use client";

import { getPersonalInformationSWR } from "@/services/user.api";
import useSWR from "swr";

import { useAuthStore } from "@/store/auth.store";

export const useUserInfo = () => {
  const hydrated = useAuthStore((state) => state.hydrated);
  const { data, error, isLoading } = useSWR(
    hydrated ? "personal_information" : null,
    getPersonalInformationSWR,
    {
      dedupingInterval: 3 * 60 * 60 * 1000,
    }
  );

  return {
    userInfo: data?.user,
    isLoading,
    isError: error,
  };
};
