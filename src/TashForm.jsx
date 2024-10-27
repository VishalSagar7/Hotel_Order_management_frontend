import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';

const TestForm = () => {
    const formik = useFormik({
        initialValues: { hotelName: '', password: '' },
        onSubmit: (values) => {
            console.log("Form Submitted with values: ", values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                name="hotelName"
                onChange={formik.handleChange}
                value={formik.values.hotelName}
            />
            <TextField
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default TestForm;
