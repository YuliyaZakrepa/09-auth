import axios, {AxiosError} from "axios";

export type ApiError = AxiosError<{ error: string }>;

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';
export const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
   headers: {
    'Content-Type': 'application/json',
  },
});