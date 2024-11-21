import * as yup from 'yup';

const loginSchema = yup.object({
 
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
})

export default loginSchema;
