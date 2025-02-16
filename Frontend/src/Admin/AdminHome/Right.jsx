import React, { useEffect, useRef, useState } from 'react'
import DashBoard from '../components/DashBoard'
import Restaurants from '../components/Restaurants'
import Tables from '../components/Tables'
import {useNavigate} from 'react-router-dom'
const Right = ({comp}) => {
  const navigate=useNavigate()
  const components={
    dashboard:<DashBoard/>,
    restaurants:<Restaurants/>,
    tables:<Tables/>
  }
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const logOut=()=>{
    localStorage.removeItem("adminToken");
    navigate("/adminlogin")
  }
  return (
    <div>
      {/* <nav className="navbar bg-light shadow-sm">
        <div className="container-fluid">
          <div className="serach">
            <input type="text " className='form-control-sm' />
          </div>
          <div className="profile">
            <img src="./img/housekeeping-icon.png" alt="no image" />
          </div>
        </div>
      </nav> */}
     <nav className="navbar bg-light shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="search">
          <input type="text" className="form-control-sm" placeholder="Search..." />
        </div>

        <div className="profile position-relative" ref={dropdownRef}>
          <img
            src="./img/housekeeping-icon.png"
            alt="Profile"
            className="rounded-circle"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            onClick={toggleDropdown}
          />

          {showDropdown && (
            <div className="dropdown-menu show position-absolute end-0 mt-2 p-2 shadow" style={{ minWidth: "150px" }}>
              <button className="dropdown-item">Profile</button>
              <button className="dropdown-item text-danger" onClick={logOut}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  {/* <DashBoard/> */}
  {components[comp]}
    </div>
  )
}

export default Right
