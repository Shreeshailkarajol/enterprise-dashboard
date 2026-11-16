import axios from "axios";
import { storage } from "../utils/storage";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const auth = storage.getAuth()
  console.log('auth from interceptors', auth)
  if(auth?.accessToken){
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }

  return config
})

export default api;