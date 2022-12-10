import React, { useState, useEffect, useContext } from 'react';

const EditForm = ({user, cancel})=>{
    const [loading, setLoading] = useState(false);
    // const {login, businessName} = useContext(AuthContext);    
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [eMail, setEmail] = useState("");
    const [userName, setUserName ]= useState("");
    //The following state values are booleans that indicate whether the users info is valid
    const [firstCheck, setFirstCheck] = useState(true);
    const [lastCheck, setLastCheck] = useState(true);
    const [userCheck, setUserCheck] = useState(true)
    const [eMailCheck, setEmailCheck] = useState(true);
    //Account exists check's for existing account and prevents submission if one is found
    const [accountExists, setAccountExists] = useState(true);
    useEffect(()=>{
            //scroll to top of page on load.  If logged it, do not display this page, instead redirect to dashboard
            window.scroll(0,0);
            setLoading(false); 
            setFirst(user.firstName)
            setLast(user.lastName)
            setEmail(user.email)
            setUserName(user.userName)

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
        setAccountExists(true);

        let inputs = document.querySelectorAll('input');
        for(let i = 0; i< inputs.length; i++){
            inputs[i].style.border = "1px solid #ced4da";
        }    
    }
     //this function fetches user info to verify account doesn't exist...
     const fetchMemberInfo = async (userCheck = true, first, last)=>{
        const obj = { userName, userCheck };
        await fetch("/family", {
            method: "post",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then((data)=> {
            if(!data || data.length <= 0){
                console.log("no Match")
                console.log(data)
                postMemberInfo(first, last)
            } else{
                const _userName = document.getElementById("userName");
                _userName.style.border = "1px solid red";
                setLoading(false);
                setAccountExists(false);
            }
        })
        .catch((err)=>{
            // setLoading(false);
            console.log(err)
        })    
    } 
    const postMemberInfo = async (first, last)=>{
        const obj = {firstName: first, lastName: last, userName, email : eMail, familyId: user.familyId}
        await fetch(`/family`, {
            method: "put",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }) 
        .then(response => response.json())
        .then((data)=> {
            console.log(data)
            setTimeout(()=>{
                setLoading(false)
                cancel(null)
            }, 3000)   
        })
        .catch((err)=>{
            console.log(err)
        })
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
        //validate email by making sure it includes an "@" and a ".com"
        
        let emailValidation = (/.+@.+[.com]/).test(eMail);
        //set validation to true unless...
        let validation = true;
        //..no first name, lastname, etc...
        if(!first || !last || !userName || (eMail && emailValidation === false)){
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
                    
            if(emailValidation === false){
                email.style.border = "1px solid red";
                setEmailCheck(false);
            }
        }
        //if everything is valid, fetch user info to verify account doesn't already exist
        else if( validation === true){
            if(user.userName !== userName){
                fetchMemberInfo(true, firstCapitalized, lastCapitalized)
            } else{
                postMemberInfo(firstCapitalized, lastCapitalized)
            }
            setLoading(true);
        }
        
        // async function firstCall(){
        //     await fetch("/family", {
        //         method: "post",
        //         headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             userName: userName,
        //         })
        //     })
        //     .then(response => response.json())
        //     .then(data=> {
        //         //if account already exists, do not submit data for next step....
        //         if(data != null){
        //             validation = false;
        //             email.style.border = "1px solid red";
        //             setAccountExists(false);
        //         }
        //         else{
        //             // if account doesn't exist, submit form data for the next step....
        //         }
        //     })
        // }
    }
    
    return(
        // <div className="col-12 offset-sm-1 col-sm-10 offset-md-2 col-md-8 offset-lg-3 col-lg-6">
            // <div className="card borderDiv editFormTopDiv" style={{color: "black"}}>
                <div className="card themeCard" style={{border: "3px solid rgb(39, 33, 51)", boxShadow: "rgb(88 205 209) 0px 0px 0px 4px inset"}}>
                    <form style={{padding: 10}}>
                        <div className="form-row">
                            <div className="form-group col-md-12 ">
                                <label for="userName">{userCheck === false ? <span className="errorStyle">Input User Name</span> : accountExists === false ? <span className="errorStyle">This Username is taken</span> : "User Name"}</label>
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
                            <div className="form-group col-md-12">
                                <label for="email">{(eMailCheck === false && accountExists) ? <span className="errorStyle">Input Valid Email</span> : accountExists === false ? <span className="errorStyle">This Email is taken</span> : "Email"}</label>
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
                        </div>
                        
                        <button type="button" className="btn btn-block btnStyle mt-3" 
                            style={!loading ? {backgroundColor: "#58afd1", color: "white"} : {boxShadow: "inset 0 0 0 4px rgb(88 209 103)", color: "rgb(88 209 103)"}} 
                            onClick={(e)=>handleSubmit(e)}>
                                {!loading ? "Save" : "Saving..."}
                        </button>
                        <button type="button" className="btn btn-block btnStyle mt-1" onClick={()=>cancel(null)}>
                            Cancel
                        </button>
                    </form>
                </div>
                
            // </div>
        // </div>         
    )  

}

export default EditForm;