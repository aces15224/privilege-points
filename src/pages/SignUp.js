import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { Icon } from '@iconify/react';

// import {AuthContext} from '../App';



const SignUp = ()=>{
    // const [nameFirst, setNameFirst] = useState("");
    // const [nameLast, setNameLast] = useState("");
    // const [userEmail, setUserEmail] = useState("");
    // const [userPassword, setUserPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    // const {login, businessName} = useContext(AuthContext);

    
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [eMail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [userName, setUserName ]= useState("");
    //The following state values are booleans that indicate whether the users info is valid
    const [firstCheck, setFirstCheck] = useState(true);
    const [lastCheck, setLastCheck] = useState(true);
    const [userCheck, setUserCheck] = useState(true)
    const [eMailCheck, setEmailCheck] = useState(true);
    const [passLength, setPassLength] = useState(true);
    const [passMatch, setPassMatch] = useState(true);
    //Account exists check's for existing account and prevents submission if one is found
    const [accountExists, setAccountExists] = useState(true);
    useEffect(()=>{
            //scroll to top of page on load.  If logged it, do not display this page, instead redirect to dashboard
            window.scroll(0,0);
            setLoading(false);    
            // if(login){
            //     history.push(`/business/dashboard/${businessName}`);
            // }
    },[])

    function reset(){
        //reset state booleans and remove error messages and error styling
        setFirstCheck(true);
        setLastCheck(true);
        setEmailCheck(true);
        setUserCheck(true);
        setPassLength(true);
        setPassMatch(true);
        setAccountExists(true);

        let inputs = document.querySelectorAll('input');
        for(let i = 0; i< inputs.length; i++){
            inputs[i].style.border = "1px solid #ced4da";
        }    
    }

    function handleSubmit(e){
        e.preventDefault();
        reset();
        //capitalize first name and last name
        const firstCapitalized = first.charAt(0).toUpperCase() + first.slice(1);
        const lastCapitalized = last.charAt(0).toUpperCase() + last.slice(1);
        //create reference to inputs for potential error messages
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const _userName = document.getElementById("userName");
        const email = document.getElementById("email");
        const _password = document.getElementById("password");
        const _password2 = document.getElementById("password2")
        //validate email by making sure it includes an "@" and a ".com"
        let emailValidation = (/.+@.+[.com]/).test(eMail);
        //set validation to true unless...
        let validation = true;
        //..no first name, lastname, etc...
        if(!first || !last || !userName || password.length < 6 || password2.length < 6 || password !== password2  || emailValidation === false ){
            //then set to false so the form info is not submitted....
            validation = false;
            //and check which values where invalid and create corresponding error messages
            if(!first){
                firstName.style.border = "1px solid red"; 
                setFirstCheck(false);
            }

            if(!last){
                lastName.style.border = "1px solid red";
                setLastCheck(false);
            }
            if(!userName){
                _userName.style.border = "1px solid red";
                setUserCheck(false);
            }
            
            if(password.length < 6 || password2.length < 6){
                _password.style.border = "1px solid red";
                _password2.style.border = "1px solid red";
                setPassLength(false);
            }
            if(password !== password2){
                _password.style.border = "1px solid red";
                _password2.style.border = "1px solid red";
                setPassMatch(false);
            }
        
            if(emailValidation === false){
                email.style.border = "1px solid red";
                setEmailCheck(false);
            }
        }
        //if everything is valid, fetch user info to verify account doesn't already exist
        else if( validation === true){
            firstCall();
        }
        
        //this function fetches user info to verify account doesn't exist...
        async function firstCall(){
            await fetch(`${process.env.VERCEL_URL}/users`, {
                method: "post",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: eMail,
                })
            })
            .then(response => response.json())
            .then(data=> {
                //if account already exists, do not submit data for next step....
                if(data != null){
                    validation = false;
                    email.style.border = "1px solid red";
                    setAccountExists(false);
                }
                else{
                    // if account doesn't exist, submit form data for the next step....
                    addUser(firstCapitalized, lastCapitalized, eMail, userName, password);    
                }
            })
        }
    }

    //add user and business info to database
    const addUser = async (firstName, lastName, email, userName, password) => {
        //set loading and display loading spinner until fetch is complete....
        setLoading(true);
        await fetch("/users", {
                method: "post",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                email,
                userName,
                firstName,
                lastName,
                password,
                primary : true
            })
        })
        .then(response => response.json())
        .then((data)=> {
            //if user has been added, set loading to false, and redirect to login page....
            //allows three seconds for user to see redirection message//
            setTimeout(()=>{
                window.location.href = "/login" 
            }, 3000);
        })
        .catch((err)=>{
            setLoading(false);
            console.log(err)
        })
    }

    ///loading spinner displayed when uploading user to database
    if(loading){
        return(
            <Loading message={"You are being redirected to the login page"}/>
        )
    }
    else{
        return(
            <>
                <Navbar/>
                <div className="container-fluid" style={{backgroundColor:"#f5f5f5"}}>
                    <div className="row login-register-page" style={{ height: "100%"}}>
                        <div className="col-12 offset-sm-1 col-sm-10 offset-md-2 col-md-8 offset-lg-3 col-lg-6">
                            <div className="card register-card mt-5 mb-5">
                                <div class="d-flex mb-3" style={{justifyContent:"center", alignItems:"center"}}>
                                    <h3><Icon icon="mdi:register" /></h3>
                                    <h1>Register</h1>    
                                </div>
                                {/* <h1 className="text-center mb-3">
                                    <i className="fas fa-user-plus"></i>Register
                                </h1> */}
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="firstName">{firstCheck === false ? <span className="errorStyle">Input First Name</span> : "First Name"}</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                required
                                                name="firstName"
                                                className="form-control _inputBorder"
                                                placeholder="Enter First Name"   
                                                value={first} 
                                                onChange={(e)=>setFirst(e.target.value.trim())}                        
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="lastName">{lastCheck === false ? <span className="errorStyle">Input Last Name</span> : "Last Name"}</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                required
                                                name="lastName"
                                                className="form-control _inputBorder"
                                                placeholder="Enter Last Name"
                                                value={last} 
                                                onChange={(e)=>setLast(e.target.value.trim())}
                                            />
                                        </div>    
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="email">{eMailCheck === false ? <span className="errorStyle">Input Valid Email</span> : accountExists === false ? <span className="errorStyle">This Email is taken</span> : "Email"}</label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                name="email"
                                                className="form-control _inputBorder"
                                                placeholder="Enter Email"
                                                value={eMail} 
                                                onChange={(e)=>setEmail(e.target.value.trim())}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="userName">{userCheck === false ? <span className="errorStyle">Input User Name</span> : "User Name"}</label>
                                            <input
                                                type="text"
                                                id="userName"
                                                required
                                                name="userName"
                                                className="form-control _inputBorder"
                                                placeholder="Enter Last Name"
                                                value={userName} 
                                                onChange={(e)=>setUserName(e.target.value.trim())}
                                            />
                                        </div> 
                                    
                                    </div>
                                    <div className="form-group">
                                        <label for="password">{passLength === false ? <span className="errorStyle">Password must be at least 6 characters</span> : passMatch === false ?  <span className="errorStyle">Passwords don't match</span> : "Password"}</label>
                                        <input
                                            type="password"
                                            id="password"
                                            required
                                            name="password"
                                            className="form-control _inputBorder"
                                            placeholder="Create Password"
                                            value={password} 
                                            onChange={(e)=>setPassword(e.target.value.trim())}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="password2">Confirm Password</label>
                                        <input
                                            type="password"
                                            id="password2"
                                            required
                                            name="password2"
                                            className="form-control _inputBorder"
                                            placeholder="Confirm Password"
                                            value={password2} 
                                            onChange={(e)=>setPassword2(e.target.value.trim())}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block registration-submit btn-custom" onClick={(e)=>handleSubmit(e)}>
                                        Next
                                    </button>
                                </form>
                                    <p className="lead" style={{fontWeight:"500"}}>Have An Account? <a href="/login" style={{color:"blue"}}>Login</a></p>
                            </div>
                        </div>
                    </div>    
                </div>
                <Footer/>
            </>
        )    
    }
    
}

export default SignUp;