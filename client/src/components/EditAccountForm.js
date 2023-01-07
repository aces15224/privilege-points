import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
// import {AuthContext} from '../App';




const EditAccountForm = ({firstName, lastName, email, _userName, update})=>{
    const [first, setFirstName] = useState("");
    const [last, setLastName] = useState("");
    const [eMail, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [success, setSuccess] = useState(true);
    // const btnStyle = {border: "1px solid #474444", textShadow: "1px 1px black"};
    const btnTxt = !success ? "Saving..." : "Save";
    // const contextUserName = useContext(AuthContext)["userName"];


    //refernces for error messaging and styling
    const errorIcons = document.getElementsByClassName("error-icon"); 
    const errorMessages = document.getElementsByClassName("error");    

    useEffect(()=>{
    },[firstName, lastName, email, _userName])
    const cancel = ()=>{
        setFirstName("");
        setLastName("");
        setEmail("");
        setUserName("");
        reset();
    }

    //function for resetting error messages and styling
    const reset = ()=>{
        let inputs = document.querySelectorAll('input');
        for(let i = 0; i< inputs.length; i++){
            inputs[i].style.border = "1px solid #ced4da";
            errorIcons[i].style.opacity = 0;
            errorMessages[i].innerHTML = "";
        }  
    }

    // function for updating info in database and...
    const updateInfo = async (firstname, lastname, e_mail, username)=>{
            setSuccess(false);
            await fetch(`/users`, {
            method: "put",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstname,
                lastName: lastname,
                email: e_mail,
                userName: username,
                prevMail: email
            })
        })
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            // updating state in parent to re-render
            setTimeout(()=>{
                reset();
                setSuccess(true);
                // update("account");
            },3000) 
        }) 
    }

    //function for validating form input
    const validation = (first, last, email, username)=>{
        //capitalize first and last name
        let firstName = first.charAt(0).toUpperCase() + first.slice(1);
        let lastName = last.charAt(0).toUpperCase() + last.slice(1);

        //set validate to true
        let validated = true;

        //check if email has an "@" and a ".com"
        let emailValidation = (/.+@.+[.com]/).test(email);


        //validate info w/ the following criteria
        if(!emailValidation || firstName.length <=  1|| lastName.length <= 1 || username.length <= 1){
            //if any value is invalid, set validate to false and...
            validated = false;

            //determine which values are invalid and set corresponding error messages
            if(!emailValidation || email.length <= 3){
                document.getElementById("email").style.border = "1px solid red"; 
                errorIcons[3].style.opacity = 1; 
                errorMessages[3].innerHTML = "Input a Valid Email"
            }
            if(username.length <= 1){
                console.log(userName.length)
                errorMessages[2].innerHTML = "Input a Valid Userame";
                errorIcons[2].style.opacity = 1; 
                document.getElementById("userName").style.border = "1px solid red"; 
            }
            
            if(firstName.length <= 1){
                console.log(firstName.length)
                errorMessages[0].innerHTML = "Input a Valid First Name";
                errorIcons[0].style.opacity = 1; 
                document.getElementById("firstName").style.border = "1px solid red"; 
            }
            if(lastName.length <= 1){
                errorMessages[1].innerHTML = "Input a Valid Last Name";
                errorIcons[1].style.opacity = 1; 
                document.getElementById("lastName").style.border = "1px solid red"; 
            }
        }
        //if values are valid, send to update function
        if(validated === true){
            updateInfo(firstName, lastName, email, username);     
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        //first reset error messages and styling
        reset();
        //if the following values are empty, return prop value, otherwise return user's input
        let _first = first.trim() === "" ? firstName : first.trim();
        let _last = last.trim() === "" ? lastName : last.trim();
        let _eMail = eMail.trim() === "" ? email : eMail.trim();
        let user_Name = userName.trim() === "" ? _userName : userName.trim();

        //then pass values to the validation function
        validation(_first, _last, _eMail, user_Name);
    };
        console.log(eMail)
    return(
        <div class="col-sm-12 offset-md-3 col-md-6 offset-lg-3 col-lg-6">
            <div className="d-flex mt-3" style={{justifyContent:"center", color:"black"}}>
                <h2 className="mb-0 mr-1 updateIcon "><Icon icon="icomoon-free:profile" /> </h2>
                <h1 className="mb-0 updateText">Update Account Info</h1>  
            </div> 
            {/* <h1 className="text-center mb-3">
                <Icon icon="icomoon-free:profile" /> Update Account Information
            </h1> */}
            <div className="d-flex mt-3 mb-3" style={{alignItems: "baseline", justifyContent:"center"}}>
                <h5 style={{fontWeight: 800, fontFamily: "math", marginBottom: 0, color: "black"}}>Want to change your password?</h5>
                <Link className="listLink" to={`/dashboard/password/${_userName}`} style={{fontFamily: "math", marginBottom: 0, marginLeft: 5, textDecoration: "underline"}} >Click here</Link>
            </div> 
            <div className="card themeCard" style={{border: "3px solid rgb(39, 33, 51)", boxShadow: "rgb(88 205 209) 0px 0px 0px 4px inset"}}>
           
                <form style={{padding: 10, color: "black"}}> 
                    <div className="form-group dash-form-group">
                        <label for="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control dashInput input-w-error"
                            placeholder={firstName}
                            value={first}
                            onChange={(e)=>{setFirstName(e.target.value)}}
                        />
                        <Icon className="error-icon" icon="bx:bxs-error-circle" />
                        <div className="error"></div>
                    </div>
                    <div className="form-group dash-form-group">
                        <label for="businessName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            // required
                            name="lastName"
                            className="form-control dashInput input-w-error"
                            placeholder={lastName}
                            value={last}
                            onChange={(e)=>{setLastName(e.target.value)}}
                        />
                        <Icon className="error-icon" icon="bx:bxs-error-circle" />
                        <div className="error"></div>
                    </div>
                    <div className="form-group dash-form-group">
                        <label for="userName">Username</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={userName}
                            className="form-control dashInput input-w-error"
                            placeholder={_userName}
                            onChange={(e)=>{setUserName(e.target.value)}}
                        />
                        <Icon className="error-icon" icon="bx:bxs-error-circle" />
                        <div className="error"></div>
                    </div>
                    <div className="form-group dash-form-group">
                        <label for="eMail">Email Address</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={eMail}
                            className="form-control dashInput input-w-error"
                            placeholder={eMail === "" ? email : eMail}
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                        <Icon className="error-icon" icon="bx:bxs-error-circle" />
                        <div className="error"></div>
                    </div>
                    <button type="button" 
                        className="btn btnStyle btn-block" 
                        onClick={(e)=>handleSubmit(e)}
                        style={success ? {backgroundColor: "#58afd1", color: "white"} : {boxShadow: "inset 0 0 0 4px rgb(88 209 103)", color: "rgb(88 209 103)"}} 
                    >
                        {btnTxt}
                    </button>
                    <button type="button" className="btn btn-block btnStyle mt-1" onClick={()=>cancel()}>
                        Cancel
                    </button>
                </form> 
            </div>
        </div>
               
    )
}

export default EditAccountForm;