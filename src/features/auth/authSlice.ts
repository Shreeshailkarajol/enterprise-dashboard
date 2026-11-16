
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from './types/auth.types';
import type { StoredAuth } from './types/auth.dto';
import { loginUser, getCurrentUser } from './authThunk';
import { storage } from '../../utils/storage';

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    isInitialized: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true;
                state.isInitialized = true;
                state.error = null;

                storage.saveAuth({
                    user: action.payload.user,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                });
            })

            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
                state.isInitialized = true;
                state.isAuthenticated = false;
                state.error = 'Login Failed';
            })

            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isInitialized = true;
                state.error = null;

                storage.updateUser(action.payload);
            })

            .addCase(getCurrentUser.rejected, (state) => {
                state.loading = false;
                state.isInitialized = true;
                state.error = 'Failed to fetch current user';
            });
    },

    reducers: {
        restoreSession(state, action: PayloadAction<StoredAuth>) {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = true;

            // Don't mark initialization complete yet.
            // We still need to verify the session with the backend.
        },

        finishAuthInitialization(state) {
            state.isInitialized = true;
        },

        logout() {
            storage.clearAuth();

            return {
                ...initialState,
                isInitialized: true,
            };
        },
    },
});

export const {
    logout,
    restoreSession,
    finishAuthInitialization,
} = authSlice.actions;

export default authSlice.reducer;
