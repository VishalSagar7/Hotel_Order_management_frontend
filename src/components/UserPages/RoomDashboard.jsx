import React, { useState, useEffect } from 'react';
import useRoomAuth from '../../customHooks/VerifyTokenofRoom';
import useHotelAuth from '../../customHooks/VerifyToken';
import FoodContainer from './FoodContainer';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useSelector } from 'react-redux';
import { store } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { Switch, FormControlLabel, FormGroup } from '@mui/material';
import { Typography } from '@mui/material';
import CartNotification from './CartNotification';

const RoomDashboard = () => {
  
  const hotel = useHotelAuth();
  const room = useRoomAuth();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('Thali'); // Default category
  const [showVeg, setShowVeg] = useState(false);
  const [showNonVeg, setShowNonVeg] = useState(false);

  const roomInfo = useSelector((store) => store.roomInfo);
  const cart = useSelector((store) => store.cart);

  
  const totalItemsInCart = cart.length;

  const handleVegSwitchChange = (event) => {
    setShowVeg(event.target.checked);
    setShowNonVeg(false);
  };

  const handleNonVegSwitchChange = (event) => {
    setShowNonVeg(event.target.checked);
    setShowVeg(false); 
  };
  
  
  

  if (!hotel || !room) {
    return null;
  }

  // Categories ordered as per the preference
  const categories = [
    'Thali', 'Curry', 'Biryani', // Traditional main meals
    'Pizza', 'Burgers', 'Pasta', 'Sandwiches', // Fast foods
    'Cold Drinks', // Beverages
    'Desserts' // Sweet dishes
  ];

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <div className='min-h-[100vh] bg-gray-200 flex'>
      <div className='w-[250px] bg-white h-[100vh] shadow-lg border-r border-gray-300 p-4 fixed top-0 '>
        <h2 className='text-xl font-semibold mt-[20px] mb-[40px]'>Menu</h2>
        <div className='flex flex-col gap-2'>
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategorySelect(category)} // Update selected category on click
              className={`py-2 px-4 rounded-lg text-center cursor-pointer transition-colors 
                          ${selectedCategory === category ? 'bg-[#FF5A25]' : 'bg-gray-100 hover:bg-gray-300'} 
              ${selectedCategory === category ? 'text-white' : 'text-black'}`}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      <div className='flex-1 p-8 pt-[0px] ml-[240px]'>
        <div className=' h-[80px] w-full  flex items-center justify-between px-[20px] '>

          <div className='h-[60px] w-full  flex items-center px-[40px]'>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    sx={{
                      transform: 'scale(0.8)', // Adjust the scale to make the switch smaller or larger
                    }}
                    checked={showVeg}
                    onChange={handleVegSwitchChange}
                    color="success"
                  />
                }
                label={
                  <Typography sx={{ fontSize: '15px' }}>Veg</Typography> // Adjust label font size
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    sx={{
                      transform: 'scale(0.8)', // Same scaling for consistency
                    }}
                    checked={showNonVeg}
                    onChange={handleNonVegSwitchChange}
                    color="warning"
                  />
                }
                label={
                  <Typography sx={{ fontSize: '15px' }}>Non veg</Typography> // Adjust label font size
                }
              />
            </FormGroup>


          </div>


          <div className=' flex h-full w-[100px] items-center justify-between relative'>

            {totalItemsInCart > 0 ? (
              <div className='h-[20px] flex items-center justify-center w-[20px] absolute top-[20px] left-[20px] rounded-full bg-white'>
                <p className=' text-sm font-semibold'>{totalItemsInCart}</p>
              </div>
            )  : '' }
            <div>

              <ShoppingCartRoundedIcon
                onClick={()=>{ navigate('/cart')  }}
                sx={{
                  fontSize: '25px',
                  color: '#EC2D01'
                }}
              />
            </div>
            <h2 className='text-xl font-semibold'>{ roomInfo.roomNumber }</h2>

          </div>

        </div>
        <FoodContainer selectedCategory={selectedCategory} showVeg={showVeg} showNonVeg={showNonVeg} /> {/* Pass the selected category to FoodContainer */}


        <CartNotification totalItemsInCart={totalItemsInCart}/>
       
      </div>
    </div>
  );
};

export default RoomDashboard;
