import React from 'react';

const FoodItemCard = ({ name, category, price, description, imageUrl }) => {
    return (
        <div className="p-2 h-[300px] w-[300px] bg-white m-2 rounded shadow">
            <div className='w-full h-[70%]'>
                <img className='h-full w-full object-cover object-center' src={imageUrl} />
            </div>
        </div>
    );
};

export default FoodItemCard;
