import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function CreateUser() {
    
    // Declaring state variables for form inputs:
    const [name, setName] = React.useState('')
    const [role, setRole] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    // navigate using react router-dom
    const navigate = useNavigate();

    //send this data to backend 
    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/create', {name, role, email, password})
         .then(res => console.log(res))
         .catch(err => console.log(err))
        .then(res => {
             console.log(res)
             navigate('/user')
        }) 
        // if there any error 
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Users</h2>
                <div className='mb-2'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' className='form-control' placeholder='Enter the name'
                    onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className='mb-2'>
                    <label htmlFor='role'>Role</label>
                    <input type='role' name='role' className='form-control' placeholder='Enter the role' 
                    onChange={(e) => setRole(e.target.value)} />                  
                </div>

                <div className='mb-2'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' className='form-control' placeholder='Enter the name' 
                    onChange={(e) => setEmail(e.target.value)}/>                  
                </div>

                <div className='mb-2'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' className='form-control' placeholder='Enter the password' 
                    onChange={(e) => setPassword(e.target.value)}  />  
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateUser
