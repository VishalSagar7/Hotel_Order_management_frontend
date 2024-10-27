import React, { useEffect, useState } from 'react';
import { backendAddress } from '../../helper';
import FoodItemCard from './FoodItemCard';

const FoodContainer = ({ selectedCategory }) => {

    const [foods, setFoods] = useState([]); 

    const getFoodData = async () => {
        try {
            const response = await fetch(`${backendAddress}/api/get-all-foods`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFoods(data); // Set the data in state
            // console.log(data);
        } catch (error) {
            console.log("Error fetching food data:", error);
        }
    };

    useEffect(() => {
        getFoodData();
    }, []);

    // Filter food items based on selected category
    const filteredFoods = selectedCategory
        ? foods.filter(food => food.category === selectedCategory)
        : foods; // If no category is selected, show all foods

    return (
        <div className='min-h-[100vh] w-full'>
            <div className=' flex justify-center flex-wrap gap-[15px]'>
                {filteredFoods.length > 0 ? (
                    filteredFoods.map((food) => (
                        <FoodItemCard
                            key={food._id}
                            name={food.name}
                            category={food.category}
                            price={food.price}
                            description={food.description}
                            imageUrl={food.imageUrl}
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
