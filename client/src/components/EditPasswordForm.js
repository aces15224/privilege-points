import React, { useState } from "react";
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";


const EditPasswordForm =({userName})=>{
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");
    const [success, setSuccess] = useState(true);

    //references for error messaging and css styling
    const pass1 = document.getElementById("password");
    const pass2 = document.getElementById("password1");
    const pass3 = document.getElementById("password2");
    const errorIcons = document.getElementsByClassName("error-icon"); 
    const errorMessages = document.getElementsByClassName("error");
    const btnStyle = {border: "1px solid #474444", textShadow: "1px 1px black"};
    const btnTxt = !success ? "Saving..." : "Save";

    //reset error messaging, styling, and state
    const reset = (e)=>{
        if(e){
            e.preventDefault();    
        }
        
        let inputs = document.querySelectorAll('input');
        for(let i = 0; i< inputs.length; i++){
            inputs[i].style.border = "1px solid #ced4da";
            errorIcons[i].style.opacity = 0;
            errorMessages[i].innerHTML = "";
        }  
        setCurrentPassword("");
        setNewPassword("");
        setCopyPassword("");
    };

    //function for updating password
    const updatePassword = async ()=>{
        setSuccess(false);
        console.log("update begins")
        await fetch("/password", {
            method: "put",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            password: newPassword,
            userName: userName
            })
        })
        .then(response => response.json())
        .then(data=> {
            console.log(data)
            //if successful, reset state and error messaging
            setTimeout(()=>{
                reset();
                setSuccess(true);
            },3000) 
        });        
    }
    
    //check database to see if user's previous password is correct
    const checkPassword = async ()=>{
        console.log(currentPassword)
        console.log(newPassword)
        console.log(copyPassword)

        await fetch("/password", {
                method: "post",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                password: currentPassword,
                userName: userName
            })
        })
        .then(response => response.json())
        .then(data=> {
            //if user's password matches, they have permission to change password...
            if(data === true){
                //call updatePassword to update password
                console.log("Match")
                updatePassword()
            }
            //if user's pass does'nt match, display error and message
            else if (data === false){
                pass1.style.border = "1px solid red"; 
                errorMessages[0].innerHTML = "Incorrect Password"
                errorIcons[0].style.opacity = 1;
                // setTimeout(()=>{
                //     reset()
                // },3000)
            }
        })        
    }

    //Functionality for Submit Button
    const handleSubmit = (e)=>{
        e.preventDefault();
        //Trim values..
        const newPass = newPassword.trim();
        const newPass2 = copyPassword.trim();
        const oldPass = currentPassword.trim();       
        
        //Validate input and display errors if necessary
        if(newPass !== "" && oldPass !== "" && newPass2 !== ""){
            if((newPass === newPass2) && newPass.length > 5){
                //if new password is acceptable and doesn't match old password....
                if(newPass !== oldPass){
                    //call checkPassword function for next step 
                    checkPassword()
                }
                else{
                    // message cannot use old password
                    pass2.style.border = "1px solid red"; 
                    pass3.style.border = "1px solid red"; 
                    errorMessages[2].innerHTML = "New Password cannot match Current Password";
                    errorIcons[1].style.opacity = 1;
                    errorIcons[2].style.opacity = 1;
                }       
            } else{
                //message passwords do not match
                pass2.style.border = "1px solid red"; 
                pass3.style.border = "1px solid red"; 
                errorMessages[2].innerHTML = "Passwords do not match"
                errorIcons[1].style.opacity = 1;
                errorIcons[2].style.opacity = 1;
            }    
        } else{
            //message password fields cannot be blank
            if(newPass === ""){
                errorMessages[1].innerHTML = "Field Cannot be Blank"
                errorIcons[1].style.opacity = 1;
            }
            if(oldPass === ""){
                errorMessages[0].innerHTML = "Field Cannot be Blank"
                errorIcons[0].style.opacity = 1;
            }
            if(newPass2 === ""){
                errorMessages[2].innerHTML = "Field Cannot be Blank"
                errorIcons[2].style.opacity = 1;
            }
        }
        
        
    }
    return(
        <div class="col-sm-12 offset-md-3 col-md-6 offset-lg-3 col-lg-6">
            
            <div className="d-flex mt-3" style={{justifyContent:"center", color:"black"}}>
                <h2 className="mb-0 mr-1 updateIcon"><Icon icon="material-symbols:lock-person-outline" /> </h2>
                <h1 className="mb-0 updateText">Change Password</h1>  
            </div>
<           div className="d-flex mt-3 mb-3" style={{alignItems: "baseline", justifyContent:"center"}}>
                <h5 style={{fontWeight: 800, fontFamily: "math", marginBottom: 0, color: "black"}}>Want to Edit Account Info?</h5>
                <Link className="listLink" to={`/dashboard/account-info/${userName}`} style={{fontFamily: "math", marginBottom: 0, marginLeft: 5, textDecoration: "underline"}} >Click here</Link>
            </div>
            <div className="card themeCard" style={{border: "3px solid rgb(39, 33, 51)", boxShadow: "rgb(88 205 209) 0px 0px 0px 4px inset", color: "black"}}>
                <form style={{padding: 10}}>
                    <div className="form-group dash-form-group">
                        <label for="password">Current Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control dashInput"
                            placeholder="Enter Password"
                            value={currentPassword}
                            onChange={(e)=>setCurrentPassword(e.target.value)}
                        />
                        <Icon className="error-icon" icon="bx:bxs-error-circle" />
                        <div className="error"></div>
                    </div>
                    <div className="form-group dash-form-group">
                        <label for="password">New Password</label>
                        <input
                            type="password"
                            id="password1"
                            name="password1"
                            className="form-control dashInput"
                            placeholder="Enter Password"
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
                        />
                        <Icon className="error-icon" icon="bx:bxs-error-circle" />
                        <div className="error"></div>
                    </div>
                    <div className="form-group dash-form-group">
                        <label for="password">Confirm New Password</label>
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            className="form-control dashInput"
                            placeholder="Enter Password"
                            value={copyPassword}
                            onChange={(e)=>setCopyPassword(e.target.value)}
                        />
                        <Icon className="error-icon" icon="bx:bxs-error-circle" />
                        <div className="error"></div>
                    </div>
                    <button type="button" className="btn btnStyle" onClick={(e)=>handleSubmit(e)} 
                        style={success ? {backgroundColor: "#58afd1", color: "white"} : {boxShadow: "inset 0 0 0 4px rgb(88 209 103)", color: "rgb(88 209 103)"}} 
                    >
                        {btnTxt}
                    </button>
                    {success &&<button type="submit" className="btn btn-block btnStyle mt-1" onClick={(e)=>reset(e)}>Cancel</button>}
                </form>    
            </div>

            
        </div>
    )
}

export default EditPasswordForm;