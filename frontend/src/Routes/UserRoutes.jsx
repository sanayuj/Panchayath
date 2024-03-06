import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Pages/User/Homepage'
import Signuppage from '../Pages/User/Signuppage'
import Loginpage from '../Pages/User/Loginpage'
import Complaintpage from '../Pages/User/Complaintpage'
import ShowRequirementPage from '../Pages/User/ShowRequirementPage'
import BrithFormpage from '../Pages/User/BrithFormpage'
import UserCertStatusPage from '../Pages/User/UserCertStatusPage'
import ViewBrithCertpage from '../Pages/User/ViewBrithCertpage'
import ProjectDisplaypage from '../Pages/User/ProjectDisplaypage'
import Paymentpage from '../Pages/User/Paymentpage'
import MarriageFormpage from '../Pages/User/MarriageFormpage'
import ViewMarriageCertPage from '../Pages/User/ViewMarriageCertPage'


function UserRoutes() {
  return (
    <div>
   <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/signup' element={<Signuppage/>}/>
    <Route path='/login' element={<Loginpage/>}/>
    <Route path='/complaint' element={<Complaintpage/>}/>
    <Route path='/showRequirement/:id' element={<ShowRequirementPage/>}/>
    <Route path='/Brith' element={<BrithFormpage/>}/>
    <Route path='/certStatus' element={<UserCertStatusPage/>}/>
    <Route path='/brithCertView/:id' element={<ViewBrithCertpage/>}/>
    <Route path='/viewProjects' element={<ProjectDisplaypage/>}/>
    <Route path='/payment' element={<Paymentpage/>}/>
    <Route path='/Marriage' element={<MarriageFormpage/>}/>
    <Route path='/marriageCertView/:id' element={<ViewMarriageCertPage/>}/>
    
   </Routes>
   </div>
  )
}

export default UserRoutes