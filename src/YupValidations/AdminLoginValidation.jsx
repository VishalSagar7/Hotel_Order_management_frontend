import * as Yup from 'yup';

export const AdminLoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .min(3, 'Email must be at least 3 characters long'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
});



