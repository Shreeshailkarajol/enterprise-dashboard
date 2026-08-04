
import api from "../../../api/client";
import type { LoginRequest, LoginData } from "../types/auth.dto";

export const authService = {
    async login(request: LoginRequest): Promise<LoginData>{
     const response = await api.post(
        '/auth/login',
        request,
        {
            requiresAuth: false
        }
     )  

     return response.data.data
    }
}