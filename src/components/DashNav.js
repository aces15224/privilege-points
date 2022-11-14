import React, {useEffect, useState, useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from '../App';
// import Logo from "../images/clearLogo.png";


const DashNav =({paginate, permission})=>{
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
            <nav class="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
                <a class="navbar-brand mr-0 mr-md-2" href="/" aria-label="Privilege Points">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" class="d-block" viewBox="0 0 612 612" role="img" focusable="false"><title>Bootstrap</title><path fill="currentColor" d="M510 8a94.3 94.3 0 0 1 94 94v408a94.3 94.3 0 0 1-94 94H102a94.3 94.3 0 0 1-94-94V102a94.3 94.3 0 0 1 94-94h408m0-8H102C45.9 0 0 45.9 0 102v408c0 56.1 45.9 102 102 102h408c56.1 0 102-45.9 102-102V102C612 45.9 566.1 0 510 0z"></path><path fill="currentColor" d="M196.77 471.5V154.43h124.15c54.27 0 91 31.64 91 79.1 0 33-24.17 63.72-54.71 69.21v1.76c43.07 5.49 70.75 35.82 70.75 78 0 55.81-40 89-107.45 89zm39.55-180.4h63.28c46.8 0 72.29-18.68 72.29-53 0-31.42-21.53-48.78-60-48.78h-75.57zm78.22 145.46c47.68 0 72.73-19.34 72.73-56s-25.93-55.37-76.46-55.37h-74.49v111.4z"></path></svg> */}
                    Privilege Points
                </a>
                <div class="navbar-nav-scroll">
                    <ul class="navbar-nav bd-navbar-nav flex-row">
                        <li className="nav-item">
                            <Link className="nav-link" to = "/#home">Home</Link>
                        </li>
                        {permission && 
                            <>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" onClick={()=>paginate("account")}>Account Info</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#features" onClick={()=>paginate("account")}>Add Users</a>
                                </li>
                            </>

                        }
                        
                        <li className="nav-item">
                            <a className="nav-link" href="#contact" onClick={()=>paginate("tasks")}>Tasks</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact" onClick={()=>paginate("rewards")}>Rewards</a>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to = "/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to = "/sign-up">Sign Up</Link>
                        </li> */}   
                    </ul>
                </div>

                <ul class="navbar-nav ml-md-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to = "/login">Log Out</Link>
                    </li>
                </ul>

                {/* <div class="btn btn-bd-download d-none d-lg-inline-block mb-3 mb-md-0 ml-md-3">
                        <li className="nav-item">
                            <Link className="nav-link" to = "/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to = "/sign-up">Sign Up</Link>
                        </li>
                </div> */}
            </nav>
            {/* <nav className="navbar navbar-expand-lg">
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
                    </div>
                </div>
            </nav>     */}
        </div>
    )
}

export default DashNav;