import axiosClient from "./axiosClient";


//------------- ADMIN REGISTER ----------------
export const registerAdmin = async (data) => {
  return axiosClient.post("/admin/register", data, {
    headers: {
      "x-admin-secret": "another_super_secret_for_register"
    }
  });
};

// ---------------- ADMIN LOGIN ----------------
export const loginAdmin = async (data) => {
  return  axiosClient.post("/admin/login", data);
};

export const getAllRetailers = async () => {
  return axiosClient.get("/admin/retailers");
};
