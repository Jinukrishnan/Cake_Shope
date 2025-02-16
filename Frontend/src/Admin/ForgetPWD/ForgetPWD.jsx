import React, {  useState } from 'react'
import apiIntegration from "../../ApiIntegration"
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios"
const ForgetPWD = () => {

    const [email, setEmail] = useState("");
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(`${apiIntegration()}/api/forgetpassword`, { email })
            if (res.status == 200) {
                localStorage.setItem("email",email)
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
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Verify Your Email</label>
                    <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail4" />
                </div>
                <div className="col-12  d-flex justify-content-center" >
                    <button type="submit" className="btn btn-primary">Verify</button>
                </div>
            </form>
        </div>
    )
}

export default ForgetPWD
