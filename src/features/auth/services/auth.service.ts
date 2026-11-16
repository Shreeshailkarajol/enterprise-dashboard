
import api from "../../../api/client";
import type { LoginRequest, LoginData } from "../types/auth.dto";
import type { User } from "../types/auth.types";

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
    },

    async getCurrentUser(): Promise<User> {
        const response = await api.get('/auth/me')
        return response.data.data.user
    }
}