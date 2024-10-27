import { useFormik } from 'formik';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { AdminLoginSchema } from '../YupValidations/AdminLoginValidation';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addHotelInfo } from '../store/hotelInfoSlice';
import { backendAddress } from '../helper';

const initialStates = {
  email: '',
  password: '',
};

const HotelLoginPage = () => {

  const [loadingButton, setLoadingButton] = useState(false);
  const [errorFromServer, setErrorFromServer] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Formik = useFormik({
    initialValues: initialStates,
    validationSchema: AdminLoginSchema,
    onSubmit: async (values) => {

      setLoadingButton(true);

      const postLoginDetails = async () => {
        try {
          const response = await fetch(`${backendAddress}/api/hotel-login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            credentials :'include',
            body: JSON.stringify(values), // Sending form values as JSON
          });

          if (!response.ok) {
            const data = await response.json();
            setErrorFromServer(data.message);
            
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          // console.log('Login successful:', data.hotel);

          //dispatch the HotelInfo into the store
          dispatch(addHotelInfo({
            hotelName: data.hotel.hotelName,
            hotelEmail: data.hotel.email,
            hotelImage: data.hotel.hotelImage,
          }));

          
          setLoadingButton(false);
          navigate('/login-options');
          // Handle successful login (e.g., redirect or show a success message)

        } catch (error) {
          console.error('Error during login:', error);
          // Handle error (e.g., show an error message to the user)
        }
      };

      // Call the function to perform the login request
      postLoginDetails();

    },

  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = Formik;

  return (
    <div className="h-screen flex justify-center items-center relative bg-[#FF5A25]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-[400px] flex flex-col z-20"
      >
        <h1 className="text-center text-2xl font-semibold mb-4">Hotel Login</h1>

        <TextField
          id="email"
          label="Hotel email"
          name="email"
          value={values.hotelName}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          margin="normal"
          fullWidth
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: '50px',
            },
          }}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          margin="normal"
          fullWidth
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: '50px',
            },
          }}
        />

        {errorFromServer && <p className='text-red-600 text-sm'>{ errorFromServer }</p>}

        {/* Loading Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: '#EC2D01', 
            '&:hover': {
              bgcolor: '#FF5A25', // Change hover color as well if needed
            },
           }}
          disabled={loadingButton}
        >
          {loadingButton ? 'Loading...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default HotelLoginPage;



//etr6zYI3UdJC5cEj