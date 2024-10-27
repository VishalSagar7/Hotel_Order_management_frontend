import { createSlice } from '@reduxjs/toolkit';

const hotelInfoSlice = createSlice({
    name: 'hotelInfo',
    initialState: {
        hotelName: null,
        hotelImage: null,
        hotelEmail: null,
    },
    reducers: {
        addHotelInfo(state, action) {
            state.hotelName = action.payload.hotelName;
            state.hotelImage = action.payload.hotelImage;
            state.hotelEmail = action.payload.hotelEmail;
        },
        removeHotelInfo(state) {
            state.hotelName = null;
            state.hotelImage = null;
            state.hotelEmail = null;
        }
    },
});

export const { addHotelInfo, removeHotelInfo } = hotelInfoSlice.actions;
export default hotelInfoSlice.reducer;
