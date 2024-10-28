import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../../store/cartSlice';
import { Button } from '@mui/material';
import useRoomAuth from '../../customHooks/VerifyTokenofRoom';
import useHotelAuth from '../../customHooks/VerifyToken';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const cartItems = useSelector((store) => store.cart);
    const roomInfo = useSelector((store) => store.roomInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const hotel = useHotelAuth();
    const room = useRoomAuth();

    if (!hotel || !room) {
        return null;
    }

    // Calculate the total price of all items in the cart
    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    // Function to handle removing an item from the cart
    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    // Function to increment the quantity of an item
    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    // Function to decrement the quantity of an item
    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    return (
        <div className="min-h-screen bg-gray-100 ">
           
            <div className='h-[80px] shadow-md flex items-center justify-between px-[100px]'>
                <h1 className='text-2xl font-semibold text-[#EC2D01] '>Checkout</h1>

                <div className='flex items-center'>
                    <button
                        onClick={()=> navigate('/room-dashboard')}
                        className='text-lg text-gray-900 font-semibold hover:text-[#EC2D01]'>Home
                    </button>
                    <h1 className='text-lg text-gray-800 font-semibold ml-[30px]'>{ roomInfo.roomNumber }</h1>
                </div>
            </div>
            

            <div className='flex w-full px-[100px]'>
                <div className='w-[60%]'>

                </div>
                <div className="bg-white w-[40%] shadow-md rounded-lg p-[10px] mt-[20px]  ">
                    {cartItems.length > 0 ? (
                        <>
                            <div className="mb-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center justify-between pb-[10px] "
                                    >
                                        {/* Item Image */}
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover mr-4 rounded"
                                        />

                                        {/* Item Details */}
                                        <div className="flex-1">
                                            <h2 className="text-lg font-semibold">{item.name}</h2>
                                            <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center">
                                            <Button
                                                onClick={() => handleDecrement(item._id)}
                                                sx={{
                                                    color: 'white',
                                                    minWidth: '20px',
                                                    height: '20px',
                                                    bgcolor: '#EC2D01',
                                                    '&:hover': { bgcolor: ' #FF5A25' },
                                                }}
                                            >
                                                -
                                            </Button>
                                            <span className="px-2 text-lg">{item.quantity}</span>
                                            <Button
                                                onClick={() => handleIncrement(item._id)}
                                                sx={{
                                                    color: 'white',
                                                    minWidth: '20px',
                                                    height: '20px',
                                                    bgcolor: '#EC2D01',
                                                    '&:hover': { bgcolor: ' #FF5A25' },
                                                }}
                                                
                                            >
                                                +
                                            </Button>
                                        </div>

                                        {/* Item Total and Remove Button */}
                                        <div className="flex items-center">
                                            <p className="text-md mr-[20px] text-gray-900 ml-[20px]">
                                                ₹{item.price * item.quantity}
                                            </p>
                                            <Button
                                                onClick={() => handleRemoveItem(item._id)}
                                                sx={{
                                                    color: 'white',
                                                    minWidth: '30px',
                                                    height: '25px',
                                                    bgcolor: '#EC2D01',
                                                    '&:hover': { bgcolor: ' #FF5A25' },
                                                }}
                                                
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total Amount */}
                            <div className="flex justify-between items-center pt-4 ">
                                <h2 className="">Total</h2>
                                <p className="text-lg ">₹{calculateTotal()}</p>
                            </div>

                            {/* Checkout Button */}
                            <Button
                                sx={{
                                    color: 'white',
                                    bgcolor: '#EC2D01 ',
                                    height: '45px',
                                    marginTop : '10px',
                                    width : '100%',
                                    '&:hover': { bgcolor: '#FF5A25' },
                                }}
                                onClick={() => alert('Proceeding to checkout')}
                            >
                                Proceed to Checkout
                            </Button>
                        </>
                    ) : (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Cart;
