import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "./AdminLogin.css"
import { Link } from 'react-router-dom';
const AdminLogin = () => {
    const [data,setData]=useState({email:"",password:""})
    const handleChange=(e)=>{
        setData((pre)=>({...pre,[e.target.name]:e.target.value}))
    }
    const handleSubmit=async(e)=>{
       try {
        e.preventDefault();
        console.log(data);
        const res=await axios.post("http://localhost:3000/api/adminlogin",data);
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
        <div>
            <ToastContainer />
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h1 className="text text-large">Sign In</h1>
                        </div>
                        <form name="signin" className="form" onSubmit={handleSubmit}>
                            <div className="input-control">
                                <label htmlFor="email" className="input-label" hidden>Email Address</label>
                                <input type="email" name="email" onChange={handleChange} id="email" className="input-field" placeholder="Email Address"/>
                            </div>
                            <p>hello</p>
                            <div className="input-control">
                                <label htmlFor="password" className="input-label" hidden>Password</label>
                                <input type="password" name="password" onChange={handleChange} id="password" className="input-field" placeholder="Password"/>
                            </div>
                            <div className="input-control">
                                <Link to={"/forgetpassword"} className="text text-links">Forgot Password</Link>
                                <input type="submit" name="submit" className="input-submit" value="Sign In" />
                            </div>
                        </form>
                       
                    </section>
                </div>
            </main>
        </div>
    )
}

export default AdminLogin
