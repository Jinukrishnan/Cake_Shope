import React from 'react'

const Login = () => {
    return (
        <div className="blackbg">
            <section className="login-wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="login-container-div">
                                <span><i className="fa-solid fa-star"></i> <b>4.4</b></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="login-bottom-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="login-container">
                                <input type="text" placeholder="Enter Mobile Number"/>
                                    <button>Continue</button>
                            </div>
                            <h6><a href="#">Terms of service</a>      s<a href="#">Privacy Policy</a></h6>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
