import axios from 'axios'
import React, { useState } from 'react'
import apiIntegration from "../ApiIntegration"
import { ToastContainer, toast } from 'react-toastify';
import "./AdminLogin.scss"
import { Link, useNavigate } from 'react-router-dom';
const AdminLogin = () => {
    const navigate=useNavigate()
    const [data, setData] = useState({ email: "", password: "" })
    const handleChange = (e) => {
        setData((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(data);
            const res = await axios.post(`${apiIntegration()}/api/adminlogin`, data);
            console.log(res.data.adminToken);
            
            if(res.status===200){
                localStorage.setItem("adminToken",res.data.adminToken)
                // toast.success(res.data.msg, {
                //     position: "bottom-center",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: false,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "dark",
                // });
                // setTimeout(()=> 
                    navigate("/admin")
                // , 3000);
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

            <form className="row g-3 bg-light p-5 m-1 w-75 shadow-lg" onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <div className="col-md-6">
                    <label for="inputEmail4" className="form-label">Email</label>
                    <input type="email" name='email' onChange={handleChange} className="form-control" id="inputEmail4" />
                </div>
                <div className="col-md-6">
                    <label for="inputPassword4" className="form-label">Password</label>
                    <input type="password" name="password" onChange={handleChange} className="form-control" id="inputPassword4" />
                </div>
                <Link to={"/forgetpassword"} className="text-decoration-none text-dark">Forgot Password?</Link>
                <div className="col-12" >
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>
    )
}

export default AdminLogin
