import React from 'react'
import Sidebar from '../../layout/Sidebar'
import Navbar from '../../Header/Navbar'
import styles from './dashboard.module.css'


const Dashboard = () => {


  

  return (
    <>
    <Navbar/>
    <div className="dashboard">
    <Sidebar/>
   <div ></div>
    
    </div>
    </>
  )
}

export default Dashboard