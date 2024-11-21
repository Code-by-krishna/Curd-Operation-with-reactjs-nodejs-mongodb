import * as yup from 'yup';

const signupSchema = yup.object({
  Fullname: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters!')
    .max(15, 'Name cannot exceed 15 characters!')
    .required('Name is required!'),
  
  Email: yup
    .string()
    .email('Must be a valid email!')
    .required('Email is required!')
    .lowercase(),
  
  Password: yup
    .string()
    .min(6, 'Password must be at least 6 characters!')
    .max(15, 'Password cannot exceed 15 characters!')
    .required('Password is required!'),
  
  Pnumber: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits!')
    .required('Phone number is required!'),
});

export default signupSchema;
