import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from '../App';

const Footer = ({permission})=>{
    const {login, loginFunction, userName, _permission} = useContext(AuthContext);
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
        <div className="footer-basic navbar-dark navStyle">
            <footer style={{width: "100%"}}>
                <ul className="list-inline">
                        <li className="list-inline-item">
                            <Link className="nav-link" to = "/#home">Home</Link>
                        </li>
                        {_permission && 
                            <>
                                <li className="list-inline-item">
                                    <Link className="nav-link" to={`/dashboard/account-info/${userName}`}>Account Info</Link>

                                    {/* <a className="nav-link active" aria-current="page" onClick={()=>paginate("account")}>Account Info</a> */}
                                </li>
                                <li className="list-inline-item">
                                    <Link className="nav-link" to="/family">Family</Link>
                                    {/* <a className="nav-link" to="/family">Add Users</a> */}
                                </li>
                            </>

                        }
                        
                        <li className="list-inline-item">
                            <Link className="nav-link" to={`/dashboard/tasks/${userName}`}>Tasks</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link className="nav-link" to={`/dashboard/rewards/${userName}`}>Rewards</Link>
                        </li>
                    {/* <li className="list-inline-item"><a href="/">Home</a></li>
                    <li className="list-inline-item"><a href="#">Account</a></li>
                    <li className="list-inline-item"><a href="#">Family</a></li>
                    <li className="list-inline-item"><a href="#">Tasks</a></li>
                    <li className="list-inline-item"><a href="#">Rewards</a></li> */}
                    {login ? <li className="list-inline-item"><Link className="nav-link" to = "/login">Log Out</Link></li>: 
                        <>
                            <li className="list-inline-item"><Link className="nav-link" to = "/login">Login</Link></li>
                            <li className="list-inline-item"><Link className="nav-link" to = "/sign-up">Sign Up</Link></li>                                    
                        </>}

                </ul>
                <p className="copyright">Privilege Points © 2022</p>
            </footer>
        </div>
    )
}

export default Footer;