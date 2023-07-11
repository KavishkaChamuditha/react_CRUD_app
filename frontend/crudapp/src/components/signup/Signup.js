import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
  // adding state values with empty strings
  const [values, setValues] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  //error handling and sending data to the server
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (
      errors.name === '' && errors.role === '' &&errors.email === '' && errors.password === '') {
      axios.post('http://localhost:8081/signup', values)
        .then((res) => {
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='d-flex justify-content-center align-item-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25 h-50 mt-5'>
        <h2>Sign Up</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'>
              <strong>Your Name</strong>
            </label>
            <input className='form-control rounded-0'type='text' name='name' id='name' placeholder='Enter Your name' onChange={handleInput}/>
            {errors.name && (<span className='text-danger'>{errors.name}</span>)}
          </div>

          <div className='mb-3'>
            <label htmlFor='role'>
              <strong>Your Role</strong>
            </label>
            <select className='form-control rounded-0' id='role' name='role' value={values.role} onChange={handleInput}>
              <option value=''>Select Role</option>
              <option value='administrator'>Administrator</option>
              <option value='user'>User</option>
              <option value='staff'>Staff</option>
            </select>
            {errors.role && (<span className='text-danger'>{errors.role}</span>)}
          </div>

          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input className='form-control rounded-0' type='email' name='email' id='email' placeholder='Enter Your Email' onChange={handleInput}/>
            {errors.email && ( <span className='text-danger'>{errors.email}</span>)}
          </div>

          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input className='form-control rounded-0' type='password' name='password' id='password' placeholder='Enter Your Password'
              onChange={handleInput}/>
            {errors.password && (
              <span className='text-danger'>{errors.password}</span>
            )}
          </div>

          <button type='submit' className='btn btn-success w-100'>
            <strong>Sign Up</strong>
          </button>

          <p>Don't have an account?</p>
          <Link to='/' className='btn btn-default border w-100 bg-light text-decoration-none'>
            Log In
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
