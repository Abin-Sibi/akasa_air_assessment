import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../../config/axiosConfig';
import './AdminLogin.css';  // CSS file for styling
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
  
  // Initial values for the form
  const initialValues = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Form submission handler
  const onSubmit = (values, { setSubmitting, setFieldError }) => {
    // Example API call using Axios
    axios.post('/adminlogin', values)
      .then(response => {
        // Handle successful response
        alert('Login successful');
        console.log(response.data);
          navigate('/dashboard')
      })
      .catch(error => {
        // Handle errors
        if (error.response && error.response.data) {
          // Display backend validation error message if any
          setFieldError('email', error.response.data.message || 'Login failed');
        } else {
          alert('An error occurred. Please try again.');
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="adminlogin-page">
      <div className="adminlogin-box">
        <h2>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" placeholder="Enter your email" className="input-field" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" placeholder="Enter your password" className="input-field" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminLogin;

