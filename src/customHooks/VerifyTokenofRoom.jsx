import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendAddress } from '../helper';
import { addRoom } from '../store/roomInfoSlice'
import { useDispatch } from 'react-redux';


const useRoomAuth = () => {
    
    const [room, setRoom] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    

    useEffect(() => {
        const checkRoomAuth = async () => {
            try {
                // Make a GET request to verify the room token
                const response = await fetch(`${backendAddress}/api/verify-room-token`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies in request
                });

                const data = await response.json();

                // If token is valid, set the room data
                if (response.ok) {
                    // console.log("roominfo", data.room.roomNumber);
                    
                    dispatch(addRoom({
                        roomNumber:data.room.roomNumber
                    }))
                    
                    setRoom(data.room); // Assuming the response contains a `room` object
                } else {
                    if (!response.ok) {
                        navigate('/login-options'); // Redirect to room login if the token is invalid
                        return;
                    }
                    setRoom(null); // Token verification failed
                }
            } catch (error) {
                console.error('Room authentication failed:', error);
                setRoom(null);
            }
        };

        checkRoomAuth();
    }, [navigate]);

    return room; 
};

export default useRoomAuth;
