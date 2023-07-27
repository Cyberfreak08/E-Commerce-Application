import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useProtectedRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  // const access_token = localStorage?.getItem('x-auth-token');
  const access_token = useSelector((state)=>state.reducer.user.token); 
  useEffect(() => {
    access_token !== null && setIsAuthorized(true);
  }, [access_token]);
  
  return isAuthorized;
};

export default useProtectedRoute;