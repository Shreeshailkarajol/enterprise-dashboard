import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

const ProtectedRoute = () => {
    const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth)

    if(!isInitialized){
        return <div>Checking Authentication ...</div>
    }

    if(!isAuthenticated){
        return <Navigate to='/login' replace />
    }

    return <Outlet />
}

export default ProtectedRoute;