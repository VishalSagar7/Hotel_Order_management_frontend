import { configureStore } from '@reduxjs/toolkit'
import hotelInfoReducer from './hotelInfoSlice'
import roomInfoReducer from './roomInfoSlice'

export const store = configureStore({
    reducer: {
        hotelInfo: hotelInfoReducer,
        roomInfo: roomInfoReducer,
    }
});