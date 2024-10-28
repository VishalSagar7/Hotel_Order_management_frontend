import { configureStore } from '@reduxjs/toolkit'
import hotelInfoReducer from './hotelInfoSlice'
import roomInfoReducer from './roomInfoSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
    reducer: {
        hotelInfo: hotelInfoReducer,
        roomInfo: roomInfoReducer,
        cart : cartReducer,
    }
});