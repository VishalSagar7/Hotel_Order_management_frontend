import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addHotelInfo } from '../store/hotelInfoSlice';
import { backendAddress } from '../helper';

const useHotelAuth = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch(`${backendAddress}/api/verify-hotel-token`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    navigate('/');
                    return;
                }

                const data = await response.json();

                if (data.success) {
                    dispatch(addHotelInfo({
                        hotelName: data.hotel.hotelName,
                        hotelEmail: data.hotel.email,
                        hotelImage: data.hotel.hotelImage,
                    }));
                    setIsTokenValid(true);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.error('Error verifying token:', error);
            }
        };

        verifyToken();
    }, [dispatch, navigate]);

    return isTokenValid;  // Returns token validity status
};

export default useHotelAuth;
