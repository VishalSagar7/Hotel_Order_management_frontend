import * as Yup from 'yup';

export const RoomLoginSchema = Yup.object().shape({
    roomNumber: Yup.number()
        .required('Room number is required')
        .positive('Room number must be a positive number')
        .integer('Room number must be an integer'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
});

export default RoomLoginSchema;
