import { api } from "./api";

interface UserForm {
  full_name?: string;
  gender?: string;
  phone_number?: string;
  role?: string;
  avatar?: File | null;
}

export const getUserProfile = async () => {
  try {
    return api.get("/api/users/me");
  } catch (error: any) {
    throw error;
  }
};

export const updateUserProfile = async (data: UserForm) => {
  try {
    return api.put("/api/users/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    throw error;
  }
};

export const getPersonalInformation = async () => {
  try {
    return await api.get("/api/users/profile");
  } catch (error: any) {
    throw error;
  }
};

export const getPersonalInformationSWR = async () => {
  try {
    const res = await api.get("/api/users/profile");
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const getMyFavorites = async (limit: number = 10, page: number = 1) => {
  try {
    const res = await api.get(`/api/users/favorites?limit=${limit}&page=${page}`);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};
