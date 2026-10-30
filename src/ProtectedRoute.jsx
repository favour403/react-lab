 
 import {jwtDecode} from 'jwt-decode';
 import { useAuth } from './context/AuthContext';
  import { Navigate } from 'react-router-dom';

  function ProtectedRoute ({allowedRoles,children}) {
     const {token,user} = useAuth();
      if(!token) {
        return <Navigate to={'/login'} replace />
      }
       try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            return <Navigate to={'/login'} replace />
        }

       
       }catch (error) {
        console.log (error)
       }
      if (allowedRoles && !allowedRoles.includes(user.role)) {
            return <Navigate to={'/login'} replace />
        }
     return children;
  }