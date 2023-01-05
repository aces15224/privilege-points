import React, { useState, useEffect, useContext } from 'react';
// import DashNavBar from "./DashNav";
import EditUserForm from "./EditForm";
// import Footer from ".Footer";

import { Icon } from '@iconify/react';


import {useNavigate} from "react-router-dom";
// import {AuthContext} from "../App";

// import Footer from "../components/Footer";
import LoadingSpinner from "./Loading";
import UserForm from "./UserForm";
import UserCard from "./UserCard";
// import EditUserForm from "./EditForm";
import {AuthContext} from '../App';

const EditFamilyInfo = ({familyID})=>{
    // const {familyID} = useContext(AuthContext);
    const [famList, setFamList] = useState([]);
    const [selected, setSelected] = useState(null)
    const [addForm, setAddForm] = useState(false);
    const [loading, setLoading] = useState(true);

    // const [nameLast, setNameLast] = useState("");
    // const [userEmail, setUserEmail] = useState("");
    // const [userPassword, setUserPassword] = useState("");
    useEffect(()=>{
        //scroll to top of page on load.  If logged it, do not display this page, instead redirect to dashboard
        window.scroll(0,0);
        fetchFamilyInfo()
        // setLoading(false);    
        // if(login){
        //     history.push(`/business/dashboard/${businessName}`);
        // }
    },[addForm])
    console.log(selected)
    
    const deleter = async (id)=>{
        console.log("deleted")
        setAddForm(true)

        await fetch("/family", {
            method: "delete",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({familyId : id})
        })
        .then(response => response.json())
        .then((data)=> {
            console.log("deleted")
            console.log(data)
            // fetchFamilyInfo()

        })
        .catch((err)=>{
            console.log(err)
        }) 
    }
    const _userCard = ()=>{

        if(selected === null){
            return famList.map((val, index)=>{
                return <UserCard key={index} info={val} deleter={deleter} setSelected={setSelected}/>
            })
        } else{
            return <EditUserForm user={selected} cancel={setSelected}/>

        }
    }
    const paginate = pageNumber => {
        //set current page and scroll to top of page
        // setPage(pageNumber);
        window.scroll(0,0);
    }

    const fetchFamilyInfo = async (userCheck = false)=>{
        console.log("FETCH Family Info")
        const obj = { familyId : familyID, userCheck };
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
            //if user has been added, set loading to false, and redirect to login page....
            //allows three seconds for user to see redirection message//
            console.log(data)
            if(data){
                setFamList(data)
            }
            setLoading(false)           
        })
        .catch((err)=>{
            setLoading(false);
            console.log(err)
        })    
    } 

    if(!loading) {
        if(famList.length <= 0 || addForm === true){
            return(
                <>
                    {/* <DashNavBar paginate={paginate} permission={true} page={page}/> */}
                    <div className="container-fluid dashboard-container">
                        <div className="row pt-4 pb-4" style={{minHeight: 500}}>
                            <div className="col-12 col-sm-12 offset-md-1 col-md-10 offset-lg-3 col-lg-6 " style={{color: "black", justifyContent: "center"}}>
                                <div className="d-flex mt-3" style={{justifyContent:"center", color:"black"}}>
                                    <h2 className="mb-0 mr-1 updateIcon"><Icon icon="material-symbols:group-add-outline" /> </h2>
                                    <h1 className="mb-0 updateText">Add User</h1>  
                                </div> 
                                <UserForm familyId={familyID} addForm={()=>setAddForm(false)} /> 
                            </div>
                        </div>
                    </div>
                    {/* <Footer/>  */}
                </>
            )
        } else{
            return(
                <>
                    {/* <DashNavBar paginate={paginate} permission={true} page={"family"}/> */}
                    <div className="container-fluid dashboard-container">
                        <div className="row pt-4 pb-4" style={{minHeight: 500}}>
                            <div className="col-12 col-sm-12 col-md-12 offset-lg-1 col-lg-10 " style={{color: "black", justifyContent: "center"}}>
                                <div className="d-flex mt-3" style={{justifyContent:"center", color:"black"}}>
                                    <h2 className="mb-0 mr-1 updateIcon"><Icon icon="icomoon-free:profile" /> </h2>
                                    <h1 className="mb-0 updateText">Update Family Info</h1>  
                                </div> 
                                    <div className="d-flex mt-3 mb-3" style={{alignItems: "baseline", justifyContent:"center"}}>
                                        <h5 style={{fontWeight: 800, fontFamily: "math", marginBottom: 0}}>{selected === null ? "Want to add a user?" : `Editing ${selected.firstName}'s Profile`}</h5>
                                        {selected === null && <h6 className="listLink" style={{fontFamily: "math", marginBottom: 0, marginLeft: 5, textDecoration: "underline"}} onClick={()=>setAddForm(true)}>Click here</h6>}
                                    </div>
                                    <div className="d-flex userCardHolder" style={{color: "black", justifyContent: "center"}}>
                                        {_userCard()}
                                    </div>
                            </div>
                        </div>
                    </div>
                    {/* <Footer/>  */}
                </>
                

            )     
        }    
    } else{
        return(
            <>
                {/* <DashNavBar paginate={paginate} permission={true} page={page}/> */}
                <LoadingSpinner message={"Loading..."}/>
                {/* <Footer/>  */}
            </>
                    
        ) 
    } 
    
}

export default EditFamilyInfo;