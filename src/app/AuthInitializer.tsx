import { useEffect, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { storage } from "../utils/storage";
import {
    initializeAuth,
    restoreSession,
    logout,
} from "../features/auth/authSlice";
import { getCurrentUser } from "../features/auth/authThunk";

interface AuthInitializerProps {
    children: ReactNode;
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initialize = async () => {
            const auth = storage.getAuth();

            if (!auth) {
                dispatch(initializeAuth());
                return;
            }

            // Restore saved session temporarily.
            dispatch(restoreSession(auth));

            // Verify session and fetch latest user from backend.
            const result = await dispatch(getCurrentUser());

            if (getCurrentUser.rejected.match(result)) {
                dispatch(logout());
                dispatch(initializeAuth());
            }
        };

        initialize();
    }, [dispatch]);

    const isInitialized = useAppSelector(
        (state) => state.auth.isInitialized
    );

    if (!isInitialized) {
        return <div>Initializing application...</div>;
    }

    return <>{children}</>;
};

export default AuthInitializer;