import { useEffect } from "react";
import { useAppDispatch } from "./hooks"
import { storage } from "../utils/storage";
import { initializeAuth, restoreSession } from "../features/auth/authSlice";


const AuthInitializer = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const auth = storage.getAuth()
        
        if(auth){
            dispatch(restoreSession(auth))
        }else{
            dispatch(initializeAuth())
        }
    },[dispatch])

    return null;
}


export default AuthInitializer;