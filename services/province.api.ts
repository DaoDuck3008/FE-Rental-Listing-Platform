import axios from "axios";

const provinceApi = axios.create({
  baseURL: "https://provinces.open-api.vn/api/v2/",
  timeout: 3000,
});

export const getProvinces = async () => {
  const res = await provinceApi.get("/p");
  return res.data;
};

export const getWardsByProvince = async (province_code: number) => {
  const res = await provinceApi.get(`/w?province=${province_code}`);
  return res.data;
};
