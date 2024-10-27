import React from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addHotelInfo } from '../../store/hotelInfoSlice';
import { useSelector } from 'react-redux';
import useVerifyToken from '../../customHooks/VerifyToken';
import { AdminLoginSchema } from '../../YupValidations/AdminLoginValidation';

const AdminLoginPage = () => {
  const isTokenValid = useVerifyToken();
  const hotelInfo = useSelector((store) => store.hotelInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: AdminLoginSchema,
    onSubmit: async (values) => {

      console.log(values);
      
      // Handle admin login logic here (example API call)
      // try {
      //   const response = await fetch('http://localhost:3000/api/admin-login', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(values),
      //   });

      //   const data = await response.json();

      //   if (data.success) {
      //     dispatch(addHotelInfo({
      //       hotelName: data.hotel.hotelName,
      //       hotelEmail: data.hotel.email,
      //       hotelImage: data.hotel.hotelImage,
      //     }));
      //     navigate('/admin-dashboard'); // Redirect to admin dashboard upon success
      //   } else {
      //     console.error(data.message);  // Handle login error
      //   }
      // } catch (error) {
      //   console.error('Error logging in:', error);
      // }
    },
  });

  // Instead of returning null directly, show a fallback UI when the token is invalid.
  if (!isTokenValid) {
    return (
      <div className="h-[100vh] w-[100vw] flex items-center justify-center">
        <h1 className="text-[30px] text-white font-bold">Invalid Token</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${hotelInfo.hotelImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
      className='min-h-[100vh]  flex items-center justify-center'
    >
      <h1
        style={{ textShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)' }}
        className='text-[30px] absolute top-[30px] left-[80%] text-white font-bold z-10'
      >
        {hotelInfo.hotelName}
      </h1>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1,
        }}
      />

      {/* Form Section */}
      <div className='relative z-10 bg-white w-[400px] p-8 rounded-lg shadow-lg'>
        <form onSubmit={formik.handleSubmit} className='flex  flex-col gap-6'>
          <TextField
            fullWidth
            id='email'
            name='email'
            label='Admin Email'
            variant='outlined'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}

          />

          <TextField
            fullWidth
            id='password'
            name='password'
            label='Password'
            type='password'
            variant='outlined'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}

          />

          <Button
            type='submit'
            variant='contained'
            sx={{
              mt: 2,
              bgcolor: '#EC2D01',
              '&:hover': {
                bgcolor: '#FF5A25', // Change hover color as well if needed
              },
            }}
          >
            Admin Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
