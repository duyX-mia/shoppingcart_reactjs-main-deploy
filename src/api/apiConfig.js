import axios from "axios";

export const apiConfig = axios.create({
  baseURL: "https://66211ba43bf790e070b1da4c.mockapi.io",
});

export const apiConfigV2 = axios.create({
  baseURL: "https://66211d073bf790e070b1e0a6.mockapi.io",
});