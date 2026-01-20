import { getAllAmenities } from "@/services/amenities.api";
import useSWR from "swr";

export const useAmenities = () => {
  const { data, error, isLoading } = useSWR("amenities", getAllAmenities, {
    revalidateOnFocus: false,
  });

  return {
    amenities: data,
    isLoading,
    isError: error,
  };
};
