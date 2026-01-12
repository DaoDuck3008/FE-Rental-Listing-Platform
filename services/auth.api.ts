import { api } from "./api";

interface RegisterForm {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  gender: string;
}

export const register = async (data: RegisterForm) => {
  try {
    const formData = new FormData();

    formData.append("full_name", data.full_name);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone_number);
    formData.append("password", data.password);
    formData.append("confirm_password", data.confirm_password);
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

export const googleLogin = async (token: string) => {
  try {
    return api.post("/api/auth/google", { credential: token });
  } catch (error: any) {
    throw error;
  }
};
