import React from 'react'
import ShowUserComplaints from '../../Components/Admin/ShowUserComplaints/ShowUserComplaints'
import Header from '../../Components/Admin/Header/Header'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'

function ShowUserComplaintsPage() {
  return (
    <div>
        <Header/>
        <Sidebar/>
    <ShowUserComplaints/></div>
  )
}

export default ShowUserComplaintsPage