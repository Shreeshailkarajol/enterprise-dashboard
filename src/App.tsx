import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from "./features/auth/pages/LoginPage";
import DashboardPage from './features/dashboard/pages/DashboardPage';
import ProtectedRoute from './routes/ProtectedRoute';
import Users from './features/dashboard/components/Users';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/users' element={<Users /> } />
      </Route>

      <Route 
        path='*' element={<Navigate to='/login' replace />}
      />
    </Routes>
  );
}

export default App;