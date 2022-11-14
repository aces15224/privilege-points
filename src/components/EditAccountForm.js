import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';


const EditAccountForm = ({firstName, lastName, email, update})=>{
    const [first, setFirstName] = useState("");
    const [last, setLastName] = useState("");
    const [eMail, setEmail] = useState("");

    //refernces for error messaging and styling
    const errorIcons = document.getElementsByClassName("error-icon"); 
    const errorMessages = document.getElementsByClassName("error");    

    useEffect(()=>{
        // setFormatPhone(formatedPhone)
    },[firstName, lastName, email])

    //function for resetting error messages and styling
    const reset = ()=>{
        let inputs = document.querySelectorAll('input');
        for(let i = 0; i< inputs.length; i++){
            inputs[i].style.border = "1px solid #ced4da";
            errorIcons[i].style.opacity = 0;
            errorMessages[i].innerHTML = "";
        }  
    }

    //function for updating info in database and...
    // const updateInfo = async (firstName, lastName, phone, email)=>{
    //         await fetch(`/api/users/${businessName}`, {
    //         method: "put",
    //         headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             firstName,
    //             lastName,
    //             phone,
    //             email,
    //             EstablishmentBusinessName: businessName
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data=>{
    //         console.log(data)
    //         // updating state in parent to re-render
    //         update();
    //     }) 
    // }

    //function for validating form input
    const validation = (first, last, email)=>{
        //capitalize first and last name
        let firstName = first.charAt(0).toUpperCase() + first.slice(1);
        let lastName = last.charAt(0).toUpperCase() + last.slice(1);

        //set validate to true
        let validated = true;

        //check if email has an "@" and a ".com"
        let emailValidation = (/.+@.+[.com]/).test(email);


        //validate info w/ the following criteria
        if(!emailValidation || firstName.length <= 0 || lastName.length <= 0){
            //if any value is invalid, set validate to false and...
            validated = false;

            //determine which values are invalid and set corresponding error messages
            if(!emailValidation || email.length <= 3){
                document.getElementById("email").style.border = "1px solid red"; 
                errorIcons[3].style.opacity = 1; 
                errorMessages[3].innerHTML = "Input a Valid Email"
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
            // updateInfo(firstName, lastName, phone, email);     
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
        //then pass values to the validation function
        validation(_first, _last, _eMail);
    };

        
    return(
        <form onSubmit={(e)=>handleSubmit(e)} novalidate >
            <div className="form-group dash-form-group">
                <label for="businessName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control dashInput input-w-error"
                    placeholder={firstName}
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
                    onChange={(e)=>{setLastName(e.target.value)}}
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
                    className="form-control dashInput input-w-error"
                    placeholder={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <Icon className="error-icon" icon="bx:bxs-error-circle" />
                <div className="error"></div>
            </div>
            <button type="submit" className="btn btn-success btn-block dashInput" style={{border: "1px solid #474444", textShadow: "1px 1px black"}} >
                Save
            </button>
        </form>        
    )
}

export default EditAccountForm;