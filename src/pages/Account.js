import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom";
// import Footer from "../components/Footer";
import LoadingSpinner from "../dashboard/Loading";
import UserForm from "../components/UserForm";
import UserCard from "../components/UserCard";
// import EditUserForm from "./EditForm";
// import {AuthContext} from '../App';

const EditFamilyInfo = ({family_Id, pointHandler, page})=>{
    const [famList, setFamList] = useState([]);
    // const [ currentUser, setCurrentUser] = useState(null)
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
        if(famList.length <= 2 ){
            return famList.map((val, index)=>{
                return <UserCard info={val} pointHandler={pointHandler} deleter={deleter}/>
            })
        }
    }
    const fetchFamilyInfo = async (userCheck = false)=>{
        console.log("FETCH Family Info")
        const obj = { familyId : family_Id, userCheck };
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
                <UserForm familyId={family_Id} addForm={()=>setAddForm(false)} page={page}/> 
            )
        } else{
            return(
                <>
                    
                    <div className="col-12 offset-sm-1 col-sm-10 offset-md-2 col-md-8 offset-lg-2 col-lg-8 " style={{color: "black", justifyContent: "center"}}>
                        <div className="d-flex mt-3 mb-3" style={{alignItems: "baseline", justifyContent:"center"}}>
                            <h5 style={{fontWeight: 800, fontFamily: "math", marginBottom: 0}}>Want to add a user?</h5>
                            <h6 className="listLink" style={{fontFamily: "math", marginBottom: 0, marginLeft: 5, textDecoration: "underline"}} onClick={()=>setAddForm(true)}>Click here</h6>
                        </div>
                        <div className="d-flex" style={{color: "black", justifyContent: "center"}}>
                            {_userCard()}
                        </div>
                        
                    </div>
                </>
                

            )     
        }    
    } else{
        return(
            <LoadingSpinner message={"Loading..."}/>         
        ) 
    } 
    
}

export default EditFamilyInfo;