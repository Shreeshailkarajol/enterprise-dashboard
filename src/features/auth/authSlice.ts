import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type { AuthState } from './types/auth.types'
import type { LoginData } from './types/auth.dto';
import { loginUser } from './authThunk';

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
                .addCase(loginUser.pending, (state)=>{
                            state.loading = true;
                            state.error = null;
                })

                .addCase(loginUser.fulfilled, (state, action) =>{
                        state.loading = false;
                        state.user = action.payload.user;
                        state.accessToken = action.payload.accessToken;
                        state.refreshToken = action.payload.refreshToken;
                        state.isAuthenticated = true;
                        state.error = null;
                })
                .addCase(loginUser.rejected, (state) => {
                            state.loading = false;
                            state.isAuthenticated = false;
                            state.error = "Login Failed";
                })

    },
    reducers: {

        logout(){
            return initialState;
        }
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer;

