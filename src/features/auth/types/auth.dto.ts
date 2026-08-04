import type { ApiResponse } from "../../../api/types";
import type { User } from "./auth.types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface StoredAuth {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface LoginData {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export type LoginResponse = ApiResponse<LoginData>;