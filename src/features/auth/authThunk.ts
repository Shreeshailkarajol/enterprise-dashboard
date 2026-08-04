import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from './services/auth.service'
import type { LoginRequest } from './types/auth.dto'

export const loginUser = createAsyncThunk(
    'auth/login',
    async (request: LoginRequest) => {
        const data = await authService.login(request)
        return data
    })