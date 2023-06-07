import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Header/Navbar';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';


const Home = () => {

  const history = useNavigate();

  const { user , isVerified} = useSelector((state)=> state.user)

  

  useEffect(()=>{
    
    if(user && isVerified && user.role === 'user'){
       history('/') 
    }
    else if(user && isVerified && user.role === 'admin'){
      history('/dashboard') 
    }
    else if(user && isVerified && user.role === 'agent'){
      history('/maintenance') 
    }
    
    else{
      history('/login')
    }
    
  },[user,history,isVerified])

  return (
    <>
      <Navbar/>
      <Sidebar/>
    </>
  )
}

export default Home