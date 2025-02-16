import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import apiIntegration from "../../ApiIntegration"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const navigate=useNavigate()
 const [reset,setReSet]=useState({password:"",cpassword:"",email:""})
 useEffect(()=>{
  setReSet(pre=>({...pre,email:localStorage.getItem("email")}))
 },[])
 const handleChange=(e)=>{
    setReSet(pre=>({...pre,[e.target.name]:e.target.value,}))
 }
 const handleSubmit=async(e)=>{
    e.preventDefault();
   try {
    const res=await axios.post(`${apiIntegration()}/api/resetpassword`,reset);
    if(res.status==201)
    {
        
       toast.success(res.data.msg, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }); 
    setTimeout(()=>navigate("/adminlogin"),3000)
    }
   } catch (error) {
      toast.warning(error.response.data.msg, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
   }
    

    
    
 }
 
  return (
    <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>
    <ToastContainer />

    <form className="row g-3 bg-light p-5 m-1 w-75 shadow-lg" onSubmit={handleSubmit} >
        <h1>ReSet Password</h1>
       
        <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">New Password</label>
            <input type="password" onChange={handleChange} name="password"  className="form-control" id="inputPassword4" />
        </div>
        <div className="col-md-6">
            <label htmlFor="inputPassword5" className="form-label">Confirm Password</label>
            <input type="password" onChange={handleChange} name="cpassword"  className="form-control" id="inputPassword5" />
        </div>
     
        <div className="col-12" >
            <button type="submit" className="btn btn-primary">Update</button>
        </div>
    </form>
</div>
  )
}

export default ResetPassword