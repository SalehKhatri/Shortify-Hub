/* eslint-disable react/prop-types */
import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
  const jwt=localStorage.getItem("token")
  return jwt?children:<Navigate to='/login' />
}

export default PrivateRoute