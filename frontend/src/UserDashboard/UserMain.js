import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import UserEditProfile from './UserEditProfile'

function UserMain() {
  return (
    <div>
        <Navbar/>
        <UserEditProfile/>
    </div>
  )
}

export default UserMain;