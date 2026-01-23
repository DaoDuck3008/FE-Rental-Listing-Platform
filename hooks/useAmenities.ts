import { getAllAmenities } from "@/services/amenities.api";
import useSWR from "swr";

export const useAmenities = () => {
  const { data, error, isLoading } = useSWR("amenities", getAllAmenities, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,

    dedupingInterval: 2000,
    shouldRetryOnError: false,
  });

  return {
    amenities: data,
    isLoading,
    isError: error,
  };
};
