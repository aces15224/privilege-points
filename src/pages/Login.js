import React, {useEffect, useContext} from "react";
import AuthContext from "../App"
import Navbar from "../components/NavBar";
// import Footer from "../components/Footer";

const LoginPage = ()=>{
    const inputStyle = {border: "1px solid #616263"}
    const {login, businessName, loginFunction} = useContext(AuthContext);

    return(
        <>
            <Navbar/>
            <div className="row login-register-page">
                <div className="offset-md-3 col-md-6">
                    <div className="card card-body login-register-card">
                        <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>Login</h1>
                        <form action="/api/login" method="POST">
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input
                                    style={inputStyle}
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter Email"
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
                            No Account? <a href="/sign-up">Register</a>
                        </p>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </>        
    )
};

export default LoginPage;

