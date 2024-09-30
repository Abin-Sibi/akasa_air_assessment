import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../../config/axiosConfig';
import './Login.css';  // CSS file for styling
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const navigate = useNavigate();



  // Initial values for the form
  const initialValues = {
    email: '',
    password: '',
  };

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
    axios.post('/login', values)
      .then(response => {
        const { message, token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      })
      .catch(error => {
        if (error.response && error.response.data) {
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
    <div className="login-page">
      <div className="login-box">
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

              <button type="submit" className="user-submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
