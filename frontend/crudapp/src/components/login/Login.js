import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() {  
    const [values, setValues] = useState({ 
      email: '',
      password: ''
    })
    const navigate = useNavigate();
    
// Updating the state values according to on user input 
    const handleInput = (event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    axios.defaults.withCredentials = true;

    useEffect(() => {
      axios.get('http://localhost:8081')
        .then(res => {
          console.log(res);
          if(res.data.valid) {
            // navigate('/dashboard');
          } else {
            // navigate('/login')
          }
        })
        .catch(err => {
          console.log(err);
        });
    },);

    const handleSubmit = (event) => {
      event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        // gettting the response 
      //  .then(res => console.log(res))
      //  .catch(err => console.log(err));
      .then(res => {
          if(res.data.Login){
            navigate('/dashboard'); 
          }else{
            alert('Invalid Credentials');
          }
          console.log(res);
      })
        .catch(err => console.log(err));
     
    }    

  return (
   
    <div className='d-flex justify-content-center align-item-center bg-primary vh-100'>
       <div className='bg-white p-3 rounded w-25 h-50 mt-5'>
       <h2>Log In</h2>
            <form action="" onSubmit={handleSubmit}>

                <div className='mb-3'>
                    <label htmlFor="email"> <strong>Email</strong> </label>
                    <input type="email" placeholder="Enter Your Email" name="email" onChange={handleInput} className='form-control rounded-0'/>
                </div> 

                <div className='mb-3'>
                    <label htmlFor="email"> <strong> Password </strong></label>
                    <input className='form-control rounded-0' type="password" name="password" placeholder="Enter Your Password" 
                    onChange={handleInput}/> 
                </div>

                <button type='submit' className='btn btn-success w-100'> <strong>Login</strong> </button>
                <p>Don't have an account</p>
                <Link to="/signup" className='btn btn-default border w-100 bg-light text-decoration-none'>Sign Up</Link>

            </form>
        </div> 
    </div>
  )
}

export default Login
