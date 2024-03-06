import React from 'react';
 import "./Sidebar.css"
import { HiUsers } from "react-icons/hi";
import { AiFillPieChart, AiFillFilePpt } from "react-icons/ai";
import { BiCategory } from "react-icons/bi"
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className='full-height-wrapper'>
      <SideNav
        className="sidenav "
        onSelect={(selected) => {
          navigate(selected);
        }}
      >
        <SideNav.Toggle className="toggle" />
        <SideNav.Nav defaultSelected="DashBoard">
          <NavItem eventKey="/">
            <NavIcon>
              <HiUsers size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Customers</NavText>
            <NavItem eventKey="/admin/home">
              <NavIcon></NavIcon>
              <NavText>Users List</NavText>
            </NavItem>
            <NavItem eventKey="/admin/showUserComplaints">
              <NavIcon></NavIcon>
              <NavText>Users Complaints</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="/">
            <NavIcon>
              <AiFillFilePpt size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Document</NavText>
            <NavItem eventKey="/admin/addDocument">
              <NavIcon></NavIcon>
              <NavText>Add Certificate</NavText>
            </NavItem>
            <NavItem eventKey="/admin/addRequirement">
              <NavIcon></NavIcon>
              <NavText>Add Requirement</NavText>
            </NavItem>
            <NavItem eventKey="/admin/viewAppliedCert">
              <NavIcon></NavIcon>
              <NavText>Applied Certificate</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="/admin/addProject">
            <NavIcon>
              <BiCategory size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Uploads</NavText>
            <NavItem eventKey="/admin/addProject">
              <NavIcon></NavIcon>
              <NavText>Upload Project</NavText>
            </NavItem>
            {/* <NavItem eventKey="/admin/userspost">
              <NavIcon></NavIcon>
              <NavText>User's Post</NavText>
            </NavItem> */}
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
};

export default Sidebar;