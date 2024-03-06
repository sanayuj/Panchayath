import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLoginPage from '../Pages/Admin/AdminLoginPage'
import AdminHomepage from '../Pages/Admin/AdminHomepage'
import AddCertificatePage from '../Pages/Admin/AddCertificatePage'
import CertificateRequirement from '../Pages/Admin/CertificateRequirement'
import AppliedCertViewPage from '../Pages/Admin/AppliedCertViewPage'
import ViewCertDetailsPage from '../Pages/Admin/ViewCertDetailsPage'
import ShowUserComplaintsPage from '../Pages/Admin/ShowUserComplaintsPage'
import AddProjectPage from '../Pages/Admin/AddProjectPage'
import MarriageCertpage from '../Pages/Admin/MarriageCertpage'

function AdminRoutes() {
  return (
    <Routes>
        <Route path='/' element={<AdminLoginPage/>}/>
        <Route path='/home' element={<AdminHomepage/>}/>
        <Route path='/addDocument' element={<AddCertificatePage/>}/>
        <Route path='/addRequirement' element={<CertificateRequirement/>}/>
        <Route path='/viewAppliedCert' element={<AppliedCertViewPage/>}/>
        <Route path='/viewCertDetails/:certId' element={<ViewCertDetailsPage/>}/>
        <Route path='/showUserComplaints' element={<ShowUserComplaintsPage/>}/>
        <Route path='/addProject' element={<AddProjectPage/>}/>
        <Route path='/marriageCertDetails/:certId' element={<MarriageCertpage/>} />
    </Routes>
  )
}

export default AdminRoutes