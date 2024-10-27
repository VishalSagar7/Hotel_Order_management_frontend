import { createSlice } from '@reduxjs/toolkit'

const roomInfoSlice = createSlice({
    name: 'roomInfo',
    initialState: {
        roomNumber : null,
    },
    reducers: {
        addRoom(state, data) {
            state.roomNumber = data.payload.roomNumber;
        },
        removeRoom(state) {
            state.roomNumber = null;
        }
    }
});


export const { addRoom, removeRoom } = roomInfoSlice.actions;

export default roomInfoSlice.reducer;