import React, { useState, useEffect, useContext } from "react";
import {useNavigate, Link} from "react-router-dom";
import DashNavBar from "../components/DashNav";

// import {AuthContext} from "../App";
// import moment from 'moment';


//Import Icons//
// import { Icon } from '@iconify/react';
// import borderColor from '@iconify-icons/mdi/border-color';
// import tabletDashboard from '@iconify-icons/mdi/tablet-dashboard';
// import accountEdit from '@iconify-icons/mdi/account-edit';
// import homeEdit from '@iconify-icons/mdi/home-edit';
// import currencyUsd from '@iconify-icons/mdi/currency-usd';
// import checkNetwork from '@iconify-icons/mdi/check-network';
// import logoutVariant from '@iconify-icons/mdi/logout-variant';


//Import Components//
// import LoadingSpinner from "../components/Loading";
// import Logo from "../images/clearLogo.png";
// import Footer from "../components/Footer";
// import AddImage from "../components/DashboardAddImage";
// import Main from "../components/DashboardMain";
// import BusinessInfo from "../components/DashboardBusinessInfo";
// import AccountInfo from "../components/DashboardAccountInfo";
// import Services from "../components/DashboardServices";

//Import Module Function//

const Dashboard = ()=>{
    // const [timeObject] = useState({
    //     time: setTime(),
    //     day: setDay()
    // })
    const history = useNavigate();
    // const [toDos, setToDos] = useState([]);
    // const {nameFunction} = useContext(AuthContext);

    // const [linkControl, setLinkControl] = useState({
    //     link: "dashboard",
    //     servicesCategory:"",
    //     priceLinks: false
    // })

    const [stateObject, setStateObject] = useState({});

    useEffect(()=>{
        //Check if user is allowed to access dashboard
        //If not redirect to the login page.  Otherwise, Fetch business Data
        // fetch("/api/checkAuthentication")
        // .then((response)=>response.json())
        // .then(data => {
        //     if(data.authenticated !== true){
        //         history.push("/login")
        //     } else{
        //         updateCall();   
        //     }
        // })
                        updateCall();   

    },[])
    
    //Update information once changed
    const updateCall = ()=>{
        console.log("updateCall called!!!")
        const _userName = window.location.href.split("/dashboard/")[1].replace(/%20/g, " ")
        userInfo(_userName);
    }
    
    // Function for loggin the user out
    // const logout = async (e)=>{
    //     e.preventDefault();
    //     await fetch("/api/logout")
    //     .then((data)=>{
    //         console.log("you are logged out");
    //         window.location.href = "/login";
    //     })
    // }
    
       //Fetch business Info
    const userInfo = async (_userName)=>{
        await fetch(`/dashboard/${_userName}`)
        .then(response => {
            if(response.redirected && response.url.includes("/login")){
                window.location.href = "/login"
            }
            return response.json()
        }).then(data => {
            const {
                tasks,
                rewards,
                firstName
            } = data;
             console.log(firstName)
        })
        .catch(error => console.log(error));
    } 
    return (
        // <div className="col-sm-12 col-md-9 dashPage">
        //                     <LoadingSpinner message="Loading..."/>
        //                 </div>  
        <>
        <DashNavBar/>
        <div>
            <div className="container-fluid">
                <div className="row">
                    <h1>Hello</h1>
                    
                </div>
            </div>
            {/* <Footer/> */}
        </div>
        </> 
        
    )    
    
}

export default Dashboard;