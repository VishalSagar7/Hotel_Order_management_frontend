import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

const CartNotification = ({ totalItemsInCart }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ y: '100%', opacity: 0 }}  // Starts off-screen at the bottom
            animate={{ y: totalItemsInCart > 0 ? '0%' : '100%', opacity: totalItemsInCart > 0 ? 1 : 0 }}  // Moves up when items are added
            transition={{ type: 'spring', stiffness: 120, damping: 20 }} // Adjusts the smoothness of the animation
            className="fixed flex items-center justify-between px-[20px] bottom-0 left-[35%] transform translate-x-[-50%] h-[40px] w-[650px] bg-[#EC2D01] rounded"
        >
            <p className='text-white font-semibold'>{totalItemsInCart} item added</p>

            <button
                onClick={() => navigate('/cart')}
                className='text-white'
            >
                View cart
                <ShoppingCartRoundedIcon
                    sx={{
                        fontSize: '20px',
                        marginLeft: '20px'
                    }}
                />
            </button>
        </motion.div>
    );
};

export default CartNotification;
