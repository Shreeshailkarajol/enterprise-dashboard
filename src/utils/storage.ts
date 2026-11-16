import type { StoredAuth } from '../features/auth/types/auth.dto';
import type { User } from '../features/auth/types/auth.types';

const AUTH_KEY = 'auth';

export const storage = {
    saveAuth(data: StoredAuth) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(data));
    },

    getAuth(): StoredAuth | null {
        const data = localStorage.getItem(AUTH_KEY);

        if (!data) return null;

        return JSON.parse(data) as StoredAuth;
    },

    updateUser(user: User) {
        const existingAuth = this.getAuth();

        if (!existingAuth) return;

        this.saveAuth({
            ...existingAuth,
            user,
        });
    },

    clearAuth() {
        localStorage.removeItem(AUTH_KEY);
    },
};
