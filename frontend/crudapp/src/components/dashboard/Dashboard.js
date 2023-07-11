import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';

function Dashboard() {

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
 
  //redirceting user accoding to there role 
  const handleImageClick = () => {
    // Redirect to different pages based on the role
    if (role === 'administrator') {
      navigate('/user');
    } else if (role === 'staff') {
      navigate('/staff');
    } else if (role === 'user') {
      navigate('/dashboard');
      return <p>You Have No Access To This Page</p>;
    } 
  };

// Fetching user data from the server 
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        console.log(res);
        if(res.data.valid) { 
          setName(res.data.name);
          setRole(res.data.role); 
        } else {
          // redirecting to login page 
          navigate('/login')
        }
      })
      .catch(err => {
        console.log(err);
      });
  },);

  return <div className='d-flex justify-content-center align-item-center bg-primary vh-100'>
        <div className='card-part bg-white p-3 rounded w-90 h-50 mt-5'>
        <h1 className='text-center fw-bold'>Dashboard</h1>
    
        <div>
    <div className='container'>
      <div className='row'>
        <div className='col-md-3 col-lg-4 '>
          <p className='fw-bold'>Name: {name} <br/> Role: {role}</p>
        </div>
        </div>
        </div>
        </div>

{/* card for my account and manage user */}
    <div className='container'>
      <div className='row'>
        <div className='col-md-3 col-lg-4 '>
    <Link to="/account" className="card marginsecond myaccount">
      <div className="fw-bolder ">My Account</div>
      <img src="/images/user.jpg" alt="Image Description" />
    </Link>
        </div>
        
        <div className='col-md-3 col-lg-4'>
        <div className='card secondcard' onClick={handleImageClick}>
          <div className='fw-bolder'>Manage User</div>
          <img src='/images/manageuser.jpg' alt='Image Description' />
        </div>
      </div>


      </div>
    </div>
    </div>
  </div>;
}

export default Dashboard;
