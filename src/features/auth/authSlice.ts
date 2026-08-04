import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type { AuthState } from './types/auth.types'
import type { LoginData, StoredAuth } from './types/auth.dto';
import { loginUser } from './authThunk';
import { storage } from '../../utils/storage';

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
                        storage.saveAuth({
                            user: action.payload.user,
                            accessToken: action.payload.accessToken,
                            refreshToken: action.payload.refreshToken,
                        })
                })
                .addCase(loginUser.rejected, (state) => {
                            state.loading = false;
                            state.isAuthenticated = false;
                            state.error = "Login Failed";
                })

    },
    reducers: {
        restoreSession(state, action: PayloadAction<StoredAuth>){
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = true;
        },

        logout(){
            storage.clearAuth()
            return initialState;
        }
    }
})

export const { logout, restoreSession } = authSlice.actions

export default authSlice.reducer;

