import React, { useEffect, useState } from 'react';
import { backendAddress } from '../../helper';
import FoodItemCard from './FoodItemCard';
import { useSelector } from 'react-redux';

const FoodContainer = ({ selectedCategory, showVeg, showNonVeg }) => {
    const [foods, setFoods] = useState([]);
    const cart = useSelector((store) => store.cart);

    const getFoodData = async () => {
        try {
            const response = await fetch(`${backendAddress}/api/get-all-foods`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFoods(data); // Set the data in state
        } catch (error) {
            console.log("Error fetching food data:", error);
        }
    };

    useEffect(() => {
        getFoodData();
    }, []);

    // Filter food items based on selected category and veg/non-veg filters
    const filteredFoods = foods
        .filter(food => (selectedCategory ? food.category === selectedCategory : true)) // Category filter
        .filter(food => {
            if (showVeg && !showNonVeg) return food.veg === true; // Only veg items
            if (showNonVeg && !showVeg) return food.veg === false; // Only non-veg items
            return true; // Show all items if both or neither are selected
        });

    return (
        <div className='min-h-[100vh] w-full'>
            <div className='flex justify-center flex-wrap gap-[15px]'>
                {filteredFoods.length > 0 ? (
                    filteredFoods.map((food) => (
                        <FoodItemCard
                            key={food._id}
                            data={food}
                        />
                    ))
                ) : (
                    <p>No food items available for this category.</p>
                )}
            </div>
        </div>
    );
};

export default FoodContainer;
