import { useEffect, useState } from 'react';

const useProtectedRoute = (access_token) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    access_token !== null && setIsAuthorized(true);
  }, [access_token]);
  
  return isAuthorized;
};

export default useProtectedRoute;