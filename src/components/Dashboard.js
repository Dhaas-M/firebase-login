import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { useNavigate,Navigate } from 'react-router-dom'

export default function Dashboard({user}) {
  
  const { currentUser,logout } = useAuth()
  const [error,setError] = useState()
  const navigate = useNavigate()
  async function handleLogout() {
     
    try{
      await logout()
      navigate('/login')
    } catch(err){
        setError('unable to logout')
        console.log(err);
    }
  }
   if (!currentUser) {
     return <Navigate to="/login" replace />;
  }
  return (
    <div>
        {currentUser.email}
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
