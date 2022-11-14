import React, { useState, useEffect, useContext } from "react";
import { Icon } from '@iconify/react';
import {useNavigate, Link} from "react-router-dom";
import DashNavBar from "../components/DashNav";
// import {AuthContext} from "../App";
// import moment from 'moment';


import LoadingSpinner from "../components/Loading";
import ListContainer from "../components/ListContainer";
import EditAccountForm from "../components/EditAccountForm";
import EditFamilyForm from "../components/EditFamilyInfo";

// import EditPasswordForm from "../components/EditPasswordForm";
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
    const [page, setPage] = useState("tasks"); //account, tasks, password, addusers, 

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [eMail, setEmail] = useState("");
    const [familyID, setFamilyID] = useState("")
    const [listTask, setListTask] = useState();
    const [favTask, setFavTask] = useState();
    const [favReward, setFavReward] = useState();
    const [listReward, setListReward] = useState();
    const [userPass, setUserPass] = useState();
    const [permission, setPermission] = useState(false);
    const [userName, setUserName] = useState("")
    const [infoId, setInfoId] = useState();
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);

    // const [taskHistory, setTaskHistory] = useState();
    // const [rewardHistory, setRewardHistory] = useState();
    const [secondaryUsers, setSecondaryUsers] = useState();


    // const {nameFunction} = useContext(AuthContext);
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

    // const [linkControl, setLinkControl] = useState({
    //     link: "dashboard",
    //     servicesCategory:"",
    //     priceLinks: false
    // })
    const fav = task =>{  
        let newList;      
        if(favTask === null){
            newList = [task]
            setFavTask([task])
        } else{
            setFavTask((prevState =>{
                console.log(prevState)
                // console.log(...prevState)
                newList = [...prevState, task];
                return newList;
            }))   
        }
        console.log("still __ fetch")
        fetchTasks(familyID, newList, "fav");
    }

    const paginate = pageNumber => {
        //set current page and scroll to top of page
        setPage(pageNumber);
        window.scroll(0,0);
    }

    const addTask = (task, prevTask) =>{
        if(prevTask !== null){
            setListTask((prevState =>{
                const newList = [task];
                for(let i = 0; i < prevState.length; i++){
                    if(prevState[i].task !== prevTask){
                        newList.push(prevState[i])
                    } 
                }
                fetchTasks(familyID, newList, "task")
                return newList;
            }))   

        } else{
            setListTask((prevState =>{
                console.log([...prevState, task])
                const newList = [...prevState, task];
                fetchTasks(familyID, newList, "task")
                return newList;
            }))    
        }  
    }

    const updateTask = (task, action ) =>{
        const newList = [];
        let _points = 0;
        console.log(listTask)
        task = task.task;
        listTask.map((val, index)=>{
            if(!permission){
                console.log("No Permission")
                //if this is a child's account
                console.log(val.score)

                if(val.task === task){
                    if(val.score === 0){
                        //signifies that task is in progress
                        val.score = 1;
                        val.completedBy = userName;
                        console.log(val)
                    } else{
                        //score of 2 is highest possible and means complete
                        val.score = action === "quit" ? 0 : 2;
                    }     
                } 
                newList.push(val) 
            } else{
                //if this is a parent's account
                if(val.task !== task){
                    // keep old tasks
                    newList.push(val);
                } else{
                    if(val.hasOwnProperty("completedBy")){
                        console.log(val.completedBy)
                        _points = val.value;
                        updateMember(val.completedBy, _points);    
                    } else{
                        console.log("no has own prop")
                    }
                    
                }
            }      
        }) 
        console.log(newList)
        permission === true ? fetchTasks(familyID, newList, "task") : fetchTasks(infoId, newList, "task");
        setPoints(_points);
        setListTask(newList);
    }

    const fetchTasks = async (id, arr, type)=>{ 
        arr = JSON.stringify(arr);
        const array = type === "fav" ? {favorites: arr, type} : {taskList: arr, type};
        console.log(array)
        await fetch(`/tasks/${id}`, {
            method: "put",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(array)
        }) 
        .then(response => response.json())
        .then((data)=> {
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })   
      
    }

    const updateMember = async (memberName, pts)=>{ 
        console.log("Update Member")
        let total = pts;
        await fetch(`/dashboard/${memberName}`)
        .then(response => response.json())
        .then((data)=> {
            const {pPts} = data;
            total += pPts;
            fetch("/users", {
                method: "put",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: memberName,
                    ppts: total
                })
            }) 
            .then(response => response.json())
            .then((data)=> {
                console.log(data)
            })
            .catch((err)=>{
                console.log(err)
            }) 
        })
        .catch((err)=>{
            console.log(err)
        })       
    }

    //Update information once changed
    const updateCall = ()=>{
        console.log("updateCall called!!!")
        const _userName = window.location.href.split("/dashboard/")[1].replace(/%20/g, " ")
        userInfo(_userName);

    }
    
    const taskCall = async (id)=>{
        await fetch(`/tasks/${id}`)
        .then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            const { Task, Reward } = data;
            console.log(Task.taskList)
            let taskList = Task.taskList != undefined ? JSON.parse(Task.taskList) : [];
            let rewardList = Reward.rewardList != undefined ? JSON.parse(Reward.rewardList) : [];
            setListTask(taskList);
            setListReward(rewardList); 
        })
        .catch(error => console.log(error));
        
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
        console.log("list-task")
        console.log(listTask)
        await fetch(`/dashboard/${_userName}`)
        .then(response => {
            if(response.redirected && response.url.includes("/login")){
                window.location.href = "/login"
            }
            return response.json()
        }).then(data => {
            console.log(data)
            const {
                Task,
                Reward,
                firstName,
                lastName,
                email,
                password,
                familyId,
                secondaryAccts,
                accessId,
                pPts 
            } = data;
            const primary = data.permission; 
            let taskList = "";   
            let rewardList = "";
            if(primary){
                taskList = JSON.parse(Task.taskList);   
                rewardList = Reward.rewardList;
                const taskFavs = JSON.parse(Task.favorites);
                const rewardFavs = Reward.rewardList;
                const acctList = JSON.parse(secondaryAccts); 
                setPermission(true);
                setFavReward(rewardFavs);
                setFavTask(taskFavs);
                setEmail(email);
                setSecondaryUsers(acctList);
                setListTask(taskList);
                setListReward(rewardList);   
            } else{
                taskCall(accessId);
            }
            setPoints(pPts);
            setInfoId(accessId)
            setFamilyID(familyId)
            setUserPass(password); 
            setUserName(_userName)
            setFirst(firstName);
            setLast(lastName); 
            setLoading(false);
        })
        .catch(error => console.log(error));

    } 
    
    return (
        // <div className="col-sm-12 col-md-9 dashPage">
        //                     <LoadingSpinner message="Loading..."/>
        //                 </div>  
        <>

            <DashNavBar paginate={paginate} permission={permission}/>
            <div className="container-fluid background">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>{first}'s Dashboard</h1>
                    </div>                   
                </div>
                <div className="row mt-3 mb-3">
                    <div className="col-12 text-center">
                        <div className="d-flex"style={{alignItems: "center", justifyContent:"center"}}>
                            <h1 style={{fontWeight: 800, fontFamily: "math", textShadow: "2px 1px 1px #ababe7", marginBottom: 0}}>{points}</h1>
                            <Icon icon="emojione:star"/>'s
                        </div>
                    </div> 
                </div>
                <div className="row">
                    {loading === true ? <LoadingSpinner message={"Loading..."} search={true}/> :
                    loading === false && listTask != undefined && page === "tasks" ? <ListContainer list={listTask} favs={favTask} submit={updateTask} addTask={addTask} permission={permission} favorite={fav}/>
                        : loading === false && page === "account" ?
                        <EditAccountForm 
                            firstName={first} 
                            lastName={last} 
                            email={eMail} 
                            // userName={accountData ? accountData.title : ""}
                            // businessName={businessName}
                            // update={userFetch}
                        /> 
                        : <EditFamilyForm/> 
                    }   
                </div>
            </div>
            {/* <Footer/> */}
        </> 
        
    )    
    
}

export default Dashboard;