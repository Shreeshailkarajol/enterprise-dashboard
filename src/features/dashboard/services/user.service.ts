import api from "../../../api/client";
import type { UsersResponse } from "../types/users.dto";


export const UserService = {
    async getUsers(page: number, search: string) : Promise<UsersResponse> {
        const response = await api.get('/users', {
            params: {
                page,
                search
            }
        })

        return response.data
    } 
}