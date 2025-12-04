import axiosClient from "./axiosClient";

// 🔹 Signup (Customer)
export const customerSignup = (data) => {
  return axiosClient.post("/auth/register", data);
};

// 🔹 Login (Customer)
export const customerLogin = (data) => {
  return axiosClient.post("/auth/login", data);
};
