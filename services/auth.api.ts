import { api } from "./api";

interface RegisterForm {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

export const register = async (data: RegisterForm) => {
  try {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("gender", data.gender);

    return api.post("/api/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    throw error;
  }
};

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  try {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("rememberMe", rememberMe ? "1" : "0");

    return api.post("/api/auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    throw error;
  }
};

export const logout = async () => {
  try {
    return api.post("/api/auth/logout");
  } catch (error: any) {
    throw error;
  }
};

export const refresh = async () => {
  return api.post("/api/auth/refresh");
};
