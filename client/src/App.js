import React,{useEffect} from 'react'
import Login from './components/User/Login'
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './components/layout/Home'
import { loadUser } from './action'
import { store } from './store'
import Verify from './components/User/Verify'
import VerifyLink from './components/User/VerifyLink'
import Register from './components/User/Register'
import Dashboard from './components/User/Dashboard/Dashboard'
import VehicleManagement from './components/User/VehicleManagement'
import { useSelector } from 'react-redux'
import UserRights from './components/User/UserRights/UserRights'



const App = () => {

 
const {user} = useSelector((state)=>state.user)
 
useEffect(()=>{

  
  store.dispatch(loadUser())
  
},[]);

  return (
    
      <Router>
      
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/vehiclemanagement' element={<VehicleManagement/>}/>
          <Route path='/drivermanagement' element={<VehicleManagement/>}/>
      
          <Route path='/maintenance' element={<VehicleManagement/>}/>
          <Route path='/support' element={<VehicleManagement/>}/>
          <Route path='/reports' element={<VehicleManagement/>}/>
          <Route path='/alerts' element={<VehicleManagement/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/verifyLink' element={<VerifyLink/>}/>
          {
            user?.role === 'admin' &&  <Route path='/usermanagement' element={<UserRights/>}/>
          }
        </Routes>
      </Router>
   
  )
}

export default App
