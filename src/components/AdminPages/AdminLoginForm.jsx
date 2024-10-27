import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import AdminLoginSchema from '../../YupValidations/AdminLoginSchema';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';
import { backendAddress } from '../../helper';

const AdminLoginForm = () => {

    const [errorFromServer, setErrorFromServer] = useState('');

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: AdminLoginSchema,
        onSubmit: async (values) => {
            console.log('Admin Login Form submitted:', values);

            const postLoginDetails = async () => {
                try {
                    const response = await fetch(`${backendAddress}/api/admin-login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials : 'include',
                        body: JSON.stringify(values),
                    });

                    if (!response.ok) {
                        const data = await response.json();
                        // console.log(data.message);
                        setErrorFromServer(data.message);
                        // throw new Error('Login failed');
                        return;

                    }

                    const data = await response.json();
                    
                    console.log('Login successful:', data);
                    navigate('/admin-dashboard');

                } catch (error) {
                    console.error('Error during admin login:', error);

                }
            }

            postLoginDetails();
        }
    });

    return (
        <form
            className='bg-white w-[400px] rounded p-[20px] relative'
            onSubmit={formik.handleSubmit}
        >

            <TextField
                variant='standard'
                fullWidth
                id="admin-email"
                name="email"
                label="Admin Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ mb: 2 }}
            />

            <TextField
                variant='standard'
                fullWidth
                id="admin-password"
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

            {errorFromServer && (<p className='text-red-500 mb-[10px]'>{ errorFromServer }</p>) }
            
            <Button
                variant="contained"
                type="submit"
                sx={{
                    bgcolor: '#EC2D01',
                    '&:hover': {
                        bgcolor: '#FF5A25', // Change hover color as well if needed
                    },
                }}
            >
                Login
            </Button>
        </form>
    );
};

export default AdminLoginForm;
