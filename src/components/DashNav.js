import React, {useEffect, useState, useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from '../App';
// import Logo from "../images/clearLogo.png";


const DashNav =()=>{
    //Login is a contextual function used to log out the user
    // const {login, loginFunction, businessName} = useContext(AuthContext);

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
    
    const linkStyle = {
        color:"#09b2e1",
        fontFamily: "impact",
        fontStyle: "italic",
        textShadow: "1px 1px rgba(0,0,0,.125)"
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
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Privilege Points</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to = "/#home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Account Info</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#features">Add Users</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact">Tasks & Rewards</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to = "/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to = "/sign-up">Sign Up</Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        Navbar text with an inline element
                    </span>
                    </div>
                </div>
            </nav>    
        </div>
    )
}

export default DashNav;