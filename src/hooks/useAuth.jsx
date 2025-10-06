import { use } from 'react';
import { AuthContext } from '../Pages/Provider/AuthContext';

const useAuth = () => {
    const authInfo = use(AuthContext);
    return authInfo;
};

export default useAuth;