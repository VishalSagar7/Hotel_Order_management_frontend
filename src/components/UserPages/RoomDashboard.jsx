import React, { useState, useEffect } from 'react';
import useRoomAuth from '../../customHooks/VerifyTokenofRoom';
import useHotelAuth from '../../customHooks/VerifyToken';
import FoodContainer from './FoodContainer';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useSelector } from 'react-redux';
import { store } from '../../store/store';

const RoomDashboard = () => {
  
  const hotel = useHotelAuth();
  const room = useRoomAuth();

  const [selectedCategory, setSelectedCategory] = useState('Thali'); // Default category

  const roomInfo = useSelector((store) => store.roomInfo);

  

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

  return (
    <div className='min-h-[100vh] bg-gray-200 flex'>
      <div className='w-[250px] bg-white shadow-lg border-r border-gray-300 p-4'>
        <h2 className='text-xl font-semibold mt-[20px] mb-[40px]'>Categories</h2>
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

      <div className='flex-1 p-8 pt-[0px]'>
        <div className=' h-[80px] w-full  flex items-center justify-between px-[20px] '>

          <h1 className='text-3xl font-bold text-gray-900 '>Menu</h1>

          <div className=' flex h-full w-[100px] items-center justify-between'>
            <div>
              <ShoppingCartRoundedIcon
                sx={{
                  fontSize : '25px'
                }}
              />
            </div>
            <h2 className='text-xl font-semibold'>{ roomInfo.roomNumber }</h2>

          </div>

        </div>
        <FoodContainer selectedCategory={selectedCategory} /> {/* Pass the selected category to FoodContainer */}
      </div>
    </div>
  );
};

export default RoomDashboard;
