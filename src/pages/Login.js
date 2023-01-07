import React, {useEffect, useContext} from "react";
import AuthContext from "../App"
import { Icon } from '@iconify/react';
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const LoginPage = ()=>{
    const inputStyle = {border: "1px solid #616263"}
    // const {login, businessName, loginFunction} = useContext(AuthContext);
    console.log("LOG")

    return(
        <>
            <Navbar/>
            <div className="container-fluid" style={{backgroundColor:"#f5f5f5"}}>
                <div className="row login-register-page">
                    <div className="offset-md-3 col-md-6">
                        <div className="card register-card mt-3 mb-3">
                            <div class="text-center d-flex mb-3" style={{justifyContent:"center", alignItems:"center"}}>
                                <h3><Icon icon="mdi:sign-in-variant" /></h3>
                                <h1>Login</h1>    
                            </div>                        
                            <form action="/api/login" method="POST">
                                <div className="form-group">
                                    <label for="username">User Name</label>
                                    <input
                                        style={inputStyle}
                                        type="username"
                                        id="userName"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter User Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input
                                        style={inputStyle}
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block btn-custom">Login</button>
                            </form>
                            <p className="lead mt-4" style={{fontWeight:"500"}}>
                                No Account? <a href="/sign-up" style={{color:"blue"}}>Register</a>
                            </p>
                        </div>
                    </div>
                </div>    
            </div>
            
            <Footer/>
        </>        
    )
};

export default LoginPage;

