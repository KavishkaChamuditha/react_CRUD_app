import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function User() {

  const [users, setUsers] = React.useState([])

  useEffect(() => { 
    axios.get('http://localhost:8081/users')
    // check the console for response errors 
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
    .then(res => setUsers(res.data))
    .catch(err => console.log(err));
  }, [])

  // delete the user data
  const handleDelete = async (id) => {
    try{
      await axios.delete('http://localhost:8081/users/'+id)
      window.location.reload();
    } catch(err){
      console.log(err);
 }
}
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
                  {/* update sending the id  */}
                  <Link to={`/update/${data.id}`} className='btn btn-primary'>Update</Link>
                  <button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.id)}>Delete</button>
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

export default User
