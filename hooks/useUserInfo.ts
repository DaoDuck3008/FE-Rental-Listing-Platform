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
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateIfStale: true,

      dedupingInterval: 2000,
      shouldRetryOnError: false,
    }
  );

  return {
    userInfo: data?.user,
    isLoading,
    isError: error,
  };
};
