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

export const createDraftListing = async (
  listingForm: Partial<createListingProps>,
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

  return api.post("/api/listings/draft", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getListingDetail = async (id: string) => {
  const res = await api.get(`/api/listings/${id}`);
  return res.data;
};

export const getMyListingDetail = async (id: string) => {
  const res = await api.get(`/api/listings/my-listings/${id}`);
  return res.data;
};

export const updateDraftListing = async (
  id: string,
  listingForm: Partial<createListingProps>,
  files: File[] | null,
  coverImageIndex: number
) => {
  const formData = new FormData();

  Object.entries(listingForm).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formData.append(key, value.join(","));
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  if (files) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }

  formData.append("coverImageIndex", String(coverImageIndex));

  return api.patch(`/api/listings/${id}/draft`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const submitDraftListing = async (
  id: string,
  listingForm: createListingProps,
  files: File[] | null,
  coverImageIndex: string | number
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

  return api.post(`/api/listings/${id}/submit`, formData, {
    headers: {
      "Content-Type": "mutlipart/form-data",
    },
  });
};

export const deleteListing = async (listingId: string) => {
  return api.delete(`/api/listings/${listingId}`);
};
