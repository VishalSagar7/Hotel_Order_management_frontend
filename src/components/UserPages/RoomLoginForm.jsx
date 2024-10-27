import React from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import RoomLoginSchema from '../../YupValidations/RoomLoginSchema';
import { useNavigate } from 'react-router-dom';
import { backendAddress } from '../../helper';

const RoomLoginForm = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            roomNumber: '',
            password: ''
        },
        validationSchema: RoomLoginSchema, // Apply the validation schema
        onSubmit: async (values) => {
            console.log('Room Login Form submitted:', values);
 
            const postRoomLoginDetails = async() => {
                try {
                    // API call to login
                    const response = await fetch(`${backendAddress}/api/room-login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify(values), // Send roomNumber and password
                    });

                    // Check if the response is okay
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Login failed');
                    }

                    // Handle successful login response
                    const data = await response.json();
                    console.log('Login successful:', data);

                    // navigate to room dashboard ater successfull login
                    navigate('/room-dashboard');


                    // Optionally redirect or update the UI
                } catch (error) {
                    console.error('Error during room login:', error);
                    // Optionally set an error message in the state
                }
            }

            postRoomLoginDetails();
        }
    });

    return (
        <form
            className='bg-white w-[400px] rounded p-[20px]'
            onSubmit={formik.handleSubmit}
        >
            <TextField
                variant='standard'
                fullWidth
                id="room-number"
                name="roomNumber"
                label="Room Number"
                value={formik.values.roomNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.roomNumber && Boolean(formik.errors.roomNumber)}
                helperText={formik.touched.roomNumber && formik.errors.roomNumber}
                sx={{ mb: 2 }}
            />

            <TextField
                variant='standard'
                fullWidth
                id="room-password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ mb: 2 }}
            />

            <Button
                variant="contained"
                type="submit"
                sx={{
                    bgcolor: '#EC2D01',
                    '&:hover': {
                        bgcolor: '#FF5A25',
                    },
                }}
            >
                Login
            </Button>
        </form>
    );
};

export default RoomLoginForm;
