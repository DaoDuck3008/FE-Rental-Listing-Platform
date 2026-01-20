import { api } from "./api";

export const getAllAmenities = async () => {
  try {
    const res = await api.get("/api/amenities");

    return res.data;
  } catch (error: any) {
    throw error;
  }
};
