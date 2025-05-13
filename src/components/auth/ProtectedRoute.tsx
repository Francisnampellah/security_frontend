import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user, isLoading, token } = useAuth();


  console.log("ProtectedRoute", user, isLoading, token);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return token ? <Outlet /> : "" ;
};

export default ProtectedRoute;
