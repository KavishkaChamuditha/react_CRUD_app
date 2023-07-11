import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AccountUser() {

    // Declaring state variables for form inputs: name, role, email, and password
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
  //fetching the data from the backend 
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get('http://localhost:8081')
        .then(res => {
          console.log(res);
          if(res.data.valid) {
            setName(res.data.name);
            setRole(res.data.role);
            setEmail(res.data.email);
            setPassword(res.data.password); 
          } else {
            navigate('/login')
          }
        }) 
        .catch(err => {
          console.log(err);
        });
    },);
 
    return (
      <div className='d-flex justify-content-center align-item-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25 h-50 mt-5'>
      {/* showing the results */}
        <div>
          <h2 className='text-center'>Account Details</h2>
          <div>
              <h6>Your Name</h6>
              <p>{name}</p>
              <hr/>
          </div>
         <div>
              <h6>Your Role</h6>
              <p>{role}</p>
              <hr/>
         </div>
         
         <div>
              <h6>Your Mail</h6>
              <p>{email}</p>
              <hr/>
         </div>
              <h6>Password</h6>
              <p>{password}</p>
              <hr/>
        </div>

        </div>
       </div>       
      );
      
}

export default AccountUser
