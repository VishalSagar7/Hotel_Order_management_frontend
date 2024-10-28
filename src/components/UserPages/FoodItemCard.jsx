import React from 'react';
import { Button } from '@mui/material';
import { addToCart, incrementQuantity, decrementQuantity } from '../../store/cartSlice';
import { useSelector, useDispatch } from 'react-redux';

const FoodItemCard = ({ data }) => {
    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.cart.find(item => item._id === data._id));

    

    const { imageUrl, name, price, description } = data;

    const handleAddButtonClick = () => {
        dispatch(addToCart(data));
    };

    const handleIncrementClick = () => {
        dispatch(incrementQuantity(data._id));
    };

    const handleDecrementClick = () => {
        dispatch(decrementQuantity(data._id));
    };

    return (
        <div className="p-2 h-[320px] w-[300px] bg-white m-2 rounded shadow">
            <div className='w-full h-[70%]'>
                <img className='h-full rounded w-full object-cover object-center' src={imageUrl} alt={name} />
            </div>
            <div className=''>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col justify-center'>
                        <h1 className='font-semibold'>{name}</h1>
                        <p className='text-sm text-gray-900 font-semibold'>₹{price}/-</p>
                    </div>

                    {cartItem ? (
                        <div className='flex items-center'>
                            <Button
                                onClick={handleDecrementClick}
                                sx={{
                                    color: 'white',
                                    minWidth: '30px',
                                    height: '25px',
                                    bgcolor: '#FF5A25',
                                    '&:hover': { bgcolor: '#EC2D01' },
                                }}
                            >
                                -
                            </Button>
                            <span className='px-2 text-[#EC2D01] font-bold'>{cartItem.quantity}</span>
                            <Button
                                onClick={handleIncrementClick}
                                sx={{
                                    color: 'white',
                                    minWidth: '30px',
                                    height: '25px',
                                    bgcolor: '#FF5A25',
                                    '&:hover': { bgcolor: '#EC2D01' },
                                }}
                            >
                                +
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={handleAddButtonClick}
                            sx={{
                                color: 'white',
                                height: '25px',
                                width: '50px',
                                bgcolor: '#EC2D01',
                                '&:hover': { bgcolor: '#FF5A25' },
                            }}
                        >
                            Add+
                        </Button>
                    )}
                </div>
                <p className='text-sm mt-[2px] text-gray-800 font-normal'>{description}</p>
            </div>
        </div>
    );
};

export default FoodItemCard;
