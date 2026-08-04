import { useEffect } from "react";
import { useAppDispatch } from "./hooks"
import { storage } from "../utils/storage";
import { restoreSession } from "../features/auth/authSlice";


const AuthInitializer = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const auth = storage.getAuth()
        
        if(auth){
            dispatch(restoreSession(auth))
        }
    },[dispatch])

    return null;
}


export default AuthInitializer;