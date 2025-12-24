// src/utils/api.js
export const getBase = () =>
  (import.meta.env.VITE_API_URL || "https://myproject-d7zr.onrender.com").replace(/\/+$/, "");

export const apiUrl = (path = "") => {
  const base = getBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};
