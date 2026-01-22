import { getAllAmenities } from "@/services/amenities.api";
import useSWR from "swr";

export const useAmenities = () => {
  const { data, error, isLoading } = useSWR("amenities", getAllAmenities, {
    revalidateOnFocus: false,
    dedupingInterval: 3 * 60 * 60 * 1000,
  });

  return {
    amenities: data,
    isLoading,
    isError: error,
  };
};
