"use client";

import useSWR from "swr";
import { getProvinces, getWardsByProvince } from "@/services/province.api";

export const useProvinces = () => {
  const { data, error, isLoading } = useSWR("provinces", getProvinces, {
    revalidateOnFocus: false,
    dedupingInterval: 24 * 60 * 60 * 1000,
  });

  return {
    provinces: data,
    isLoading,
    isError: error,
  };
};

export const useWardsByProvince = (province_code?: number | null) => {
  const { data, error, isLoading } = useSWR(
    province_code ? ["wardsbyProvince", province_code] : null,
    ([_, code]) => getWardsByProvince(code),
    {
      revalidateOnFocus: false,
    }
  );

  // Return empty array if no province is selected or data is not yet loaded
  if (!province_code) {
    return { wards: [], isLoading: false, isError: null };
  }

  return { wards: data || [], isError: error, isLoading };
};
