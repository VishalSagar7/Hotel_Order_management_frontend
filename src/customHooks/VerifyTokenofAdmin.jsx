import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendAddress } from '../helper';

const useAdminAuth = () => {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminAuth = async () => {
            try {
                // Make a GET request to verify the admin token
                const response = await fetch(`${backendAddress}/api/verify-admin-token`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies in request
                });

                const data = await response.json();

                // If token is valid, set the admin data
                if (response.ok) {

                    setAdmin(data.admin);

                } else {
                    if (!response.ok) {
                        navigate('/login-options');
                        return;
                    }
                    setAdmin(null); // Token verification failed
                }
            } catch (error) {
                console.error('Admin authentication failed:', error);
                setAdmin(null);
            }
        };

        checkAdminAuth();
    }, []);

    return admin; // Return the admin data if authenticated, otherwise null
};

export default useAdminAuth;
