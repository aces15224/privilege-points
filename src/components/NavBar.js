import React, {useEffect, useState, useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from '../App';
// import Logo from "../images/clearLogo.png";


const Navbar =()=>{
    //Login is a contextual function used to log out the user
    const {login, loginFunction, businessName} = useContext(AuthContext);

    useEffect(()=>{
        window.addEventListener("resize", resizeHandler);
        return ()=>{ 
            window.removeEventListener("resize", resizeHandler)
        }
    },[])

    // },[login])

    const resizeHandler = ()=>{
        //resize handler will get rid of hamburger menu when the window size is >= 576
        if(window.innerWidth >= 576){
            const btn = document.getElementById("toggleBtn");
            btn.className = "navbar-toggler collapsed";
            const toggleDiv = document.getElementById("navbarToggler");
            toggleDiv.className="navbar-collapse collapse";
        }
    }
  
    
    // //Logs out the user
    // const logout = async (e)=>{
    //     e.preventDefault();
    //     await fetch("/api/logout")
    //     .then((data)=>{
    //         console.log(data)
    //         //passes a request to log the user out up to the parent page
    //         loginFunction()
    //     })
    // }

    return(
        <div className="container-fluid navStyle">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Privilege Points</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#features">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contact">Contact</a>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to = "/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to = "/sign-up">Sign Up</Link>
                            </li> */}
                        </ul>
                        <ul class="navbar-nav ml-sm-auto d-flex">
                            {login ? 
                                <li className="nav-item"><Link className="nav-link" to = "/login">Log Out</Link></li>: 
                            <>
                                <li className="nav-item"><Link className="nav-link" to = "/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link" to = "/sign-up">Sign Up</Link></li>                                    
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>    
        </div>
    )
}

export default Navbar;