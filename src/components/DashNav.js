import React, {useEffect, useState, useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from '../App';
// import Logo from "../images/clearLogo.png";


const DashNav =({permission, familyID, userName})=>{
    //Login is a contextual function used to log out the user
    
    const {login, loginFunction} = useContext(AuthContext);
    
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
        <div className="container-fluid navStyle">
            <nav className="navbar navbar-expand-lg navbar-dark bd-navbar">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Privilege Points</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {permission && 
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/dashboard/account-info/${userName}`}>Account Info</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/dashboard/family/${userName}`}>Family</Link>
                                    </li>
                                </>
                            }
                            <li className="nav-item">
                                <Link className="nav-link" to={`/dashboard/tasks/${userName}`}>Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/dashboard/rewards/${userName}`}>Rewards</Link>
                            </li>
                        </ul>
                        <ul class="navbar-nav ml-sm-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to = "/login">Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>    
        </div>
    )

    // return(
    //     <div className="container-fluid">
    //         <nav class="navbar navbar-expand navbar-dark flex-column flex-sm-row bd-navbar">
    //             <a class="navbar-brand mr-0 mr-md-2" href="/" aria-label="Privilege Points">
    //                 Privilege Points
    //             </a>
    //             <div class="navbar-nav-scroll">
    //                 <ul class="navbar-nav bd-navbar-nav flex-row">
    //                     {/* <li className="nav-item">
    //                         <Link className="nav-link" to = "/#home">Home</Link>
    //                     </li> */}
    //                     {permission && 
    //                         <>
    //                             <li className="nav-item">
    //                                 <Link className="nav-link" to={`/dashboard/account-info/${userName}`}>Account Info</Link>

    //                                 {/* <a className="nav-link active" aria-current="page" onClick={()=>paginate("account")}>Account Info</a> */}
    //                             </li>
    //                             <li className="nav-item">
    //                                 <Link className="nav-link" to="/family">Family</Link>
    //                                 {/* <a className="nav-link" to="/family">Add Users</a> */}
    //                             </li>
    //                         </>

    //                     }
                        
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to={`/dashboard/tasks/${userName}`}>Tasks</Link>
    //                     </li>
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to={`/dashboard/rewards/${userName}`}>Rewards</Link>
    //                     </li>
    //                     {/* <li className="nav-item">
    //                         <Link className="nav-link" to = "/login">Login</Link>
    //                     </li>
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to = "/sign-up">Sign Up</Link>
    //                     </li> */}   
    //                 </ul>
    //             </div>

    //             <ul class="navbar-nav ml-sm-auto">
    //                 <li className="nav-item">
    //                     <Link className="nav-link" to = "/login">Log Out</Link>
    //                 </li>
    //             </ul>

    //             {/* <div class="btn btn-bd-download d-none d-lg-inline-block mb-3 mb-md-0 ml-md-3">
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to = "/login">Login</Link>
    //                     </li>
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to = "/sign-up">Sign Up</Link>
    //                     </li>
    //             </div> */}
    //         </nav>
    //     </div>
    // )
}

export default DashNav;