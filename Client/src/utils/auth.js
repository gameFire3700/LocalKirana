// src/utils/auth.js
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => localStorage.getItem("token");

export const removeToken = () => localStorage.removeItem("token");

// Basic JWT decode (NO verification) to get payload (for client-side use only)
export const parseJwt = (token) => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
};
