import createListingProps from "@/types/listing.type";
import { api } from "./api";

export const getAllListingTypesSWR = async () => {
  const res = await api.get("/api/listings/listing_types");
  return res.data;
};

export const getMyListings = async ({
  limit,
  page,
}: {
  limit?: number;
  page?: number;
}) => {
  const res = await api.get(
    `/api/listings/my-listings?limit=${limit}&page=${page}`
  );
  return res.data;
};

export const createListing = async (
  listingForm: createListingProps,
  files: File[] | null,
  coverImageIndex: number
) => {
  const formData = new FormData();

  Object.entries(listingForm).forEach(([key, value]) => {
    // Handle arrays (amenities)
    if (Array.isArray(value)) {
      formData.append(key, value.join(","));
    }
    // Handle other values
    else {
      formData.append(key, String(value));
    }
  });

  if (files) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }

  formData.append("coverImageIndex", String(coverImageIndex));

  return api.post("/api/listings/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
