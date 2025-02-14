import React from 'react'

const ForgetPWD = () => {
  return (
    <div>
       <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h1 className="text text-large">Sign In</h1>
                        </div>
                        <form name="signin" className="form">
                            <div className="input-control">
                                <label htmlFor="email" className="input-label" hidden>Verify Email</label>
                                <input type="email" name="email" id="email" className="input-field" placeholder="Email Address"/>
                            </div>
                           
                            <div className="input-control">
                               
                                <input type="submit" name="submit" className="input-submit" value="Send Verification" />
                            </div>
                        </form>
                       
                    </section>
                </div>
            </main>
    </div>
  )
}

export default ForgetPWD
