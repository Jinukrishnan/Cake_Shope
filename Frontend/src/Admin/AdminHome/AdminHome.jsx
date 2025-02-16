import React, { useEffect, useState } from 'react'
import Left from './Left'
import Right from './Right'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
const AdminHome = () => {
  let [comp, setComp] = useState("dashboard")
  const navigate = useNavigate()
  useEffect(() => {
    authentication();
  }, [])
  const authentication = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/adminhome", { headers: { 'Authorization': `Bearer ${localStorage.getItem("adminToken")}` } })
      if (res.status === 200) {
        let name=res.data.email.split("@")[0]
        toast.success(`Welcome ${name}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          
          });
      }

    } catch (error) {
      console.log(error.response.data.msg);

      navigate("/adminlogin")


    }
  }
  return (
    <div className='d-flex bg-light'>
      <ToastContainer />
      <div className="left flex-grow-2 min-vh-100 w-25">
        <Left setComp={setComp} />
      </div>
      <div className="right  flex-grow-1 p-2">
        <Right comp={comp} />
      </div>
    </div>
  )
}

export default AdminHome
