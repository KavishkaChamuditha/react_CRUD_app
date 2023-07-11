import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function Staff() {

  const [users, setUsers] = React.useState([])

// Fetching the of users data 
    useEffect(() => { 
      axios.get('http://localhost:8081/users')
      // .then(res => console.log(res))
      // .catch(err => console.log(err))
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
    }, [])

 
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
      <div className='w-50 h-50 bg-white p-3 rounded'>
        <Link to="/create" className='btn btn-success'>Add</Link>
        <table className='table table-bordered'>
          <thead>
            <tr>   
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>password</th> 
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
            users.map((data, i)=> (
              <tr key={i} >
                <td>{data.name}</td>
                <td>{data.role}</td>
                <td>{data.email}</td>
                <td>{data.password}</td>
                <td> 
                  <Link to={`/update/${data.id}`} className='btn btn-primary'>Update</Link>
                </td>
              </tr>
            ))
            
            }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Staff
 