import React, { useState, useEffect, useContext } from "react";
import { Icon } from '@iconify/react';
// import {useNavigate, Link} from "react-router-dom";
import { Route, Routes, useNavigate} from "react-router-dom";

import DashNavBar from "../components/DashNav";
// import {AuthContext} from "../App";
// import moment from 'moment';
import {AuthContext} from "../App";


import LoadingSpinner from "../components/Loading";
import ListContainer from "../components/ListContainer";
import EditAccountForm from "../components/EditAccountForm";
import EditPasswordForm from "../components/EditPasswordForm";
import EditFamilyForm from "../components/EditFamilyInfo";
import Footer from "../components/Footer";


//Import Module Function//

const Dashboard = ({setContext})=>{
    const history = useNavigate();
    const contextUserName = useContext(AuthContext)["userName"]
    const {updatePoints} = useContext(AuthContext);

    const [page, setPage] = useState("tasks"); //account, tasks, password, addUsers, rewards,
    // const [edit, setEdit] = useState(false);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [eMail, setEmail] = useState("");
    const [familyID, setFamilyID] = useState("")
    const [listTask, setListTask] = useState();
    const [favTask, setFavTask] = useState();
    // const [favReward, setFavReward] = useState();
    const [listReward, setListReward] = useState();
    const [userPass, setUserPass] = useState();
    const [permission, setPermission] = useState(false);
    const [userName, setUserName] = useState("")
    const [infoId, setInfoId] = useState();
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = ("");
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
        
        console.log("useeffect")
        const page_user = updateCall(); 
        userInfo(page_user.category, page_user.userName);



    },[])

    const fav = (task) =>{ 
        console.log(task)
        let newList = [];
        if(task.fav){
            if(favTask === null){
                newList.push(task);
                setFavTask([task])
            } else{
                setFavTask((prevState =>{
                    let temp = [];
                    for(let i = 0; i < prevState.length; i++){
                        if(prevState[i].task !== task.task){
                            temp.push(prevState[i])
                        } else{
                            if(prevState[i].value !== task.value){
                                temp.push(prevState[i])
                            }
                        }
                    }
                    temp.push(task)
                    if(temp.length <= 0){
                        //get rid of setPage(tasks)
                        setPage("tasks");
                        history(`/dashboard/tasks/${userName}`);
                    }
                    newList = temp;
                    return temp;
                })) 
            }  
        } else{
            setFavTask((prevState =>{
                let temp = [];
                for(let i = 0; i < prevState.length; i++){
                    if(prevState[i].task !== task.task){
                        temp.push(prevState[i])
                    } else{
                        if(prevState[i].value !== task.value){
                            temp.push(prevState[i])
                        }
                    }
                }
                if(temp.length <= 0){
                    //get rid of setPage(tasks)
                    setPage("tasks");
                    history(`/dashboard/tasks/${userName}`);
                }
                console.log(temp)
                newList = temp;
                return newList;
            }))        
        }  

        setListTask((prevList)=>{
            console.log("Set Tasks")
            let _taskArr = [];
            for(let i = 0; i < prevList.length; i++){
                if(prevList[i].task === task.task && prevList[i].value === task.value){
                    console.log("fav: "  + prevList[i].fav)
                    console.log(task.fav)
                    prevList[i].fav = task.fav;
                } 
                _taskArr.push(prevList[i])
            }
            fetchTasks(familyID, newList, _taskArr, "fav");    
            return _taskArr;
        }) 
    }

    const paginate = pageNumber => {
        //set current page and scroll to top of page
        setPage(pageNumber);
        window.scroll(0,0);
    }

    const addTask = (task, prevTask) =>{
        const {category} = updateCall()
        const page = category;
        console.log(page)
        if(page === "tasks" || page === "favorite-tasks"){
            if(prevTask !== null){
                setListTask((prevState =>{
                    const newList = [task];
                    for(let i = 0; i < prevState.length; i++){
                        if(prevState[i].task !== prevTask){
                            newList.push(prevState[i])
                        } 
                    }
                    fetchTasks(familyID, newList, null, "task");
                    return newList;
                }))   
            } else{
                setListTask((prevState =>{
                    let newList = [];
                    for(let i = 0; i < prevState.length; i++){
                        if(prevState[i].task !== task.task){
                            newList.push(prevState[i])
                        } else{
                            if(prevState[i].value !== task.value){
                                newList.push(prevState[i])
                            }
                        }
                    }
                    newList.push(task);
                    fetchTasks(familyID, newList, null, "task");
                    return newList;
                }))    
            }    
        } else{
            if(prevTask !== null){
                setListReward((prevState =>{
                    const newList = [task];
                    for(let i = 0; i < prevState.length; i++){
                        if(prevState[i].reward !== prevTask){
                            newList.push(prevState[i])
                        } 
                    }
                    fetchTasks(familyID, newList, null, "reward");
                    return newList;
                }))   
            } else{
                if(listReward.length > 0){
                    setListReward((prevState =>{
                        let newList = [];
                        for(let i = 0; i < prevState.length; i++){
                            if(prevState[i].reward !== task.reward){
                                newList.push(prevState[i])
                            } else{
                                if(prevState[i].value !== task.value){
                                    newList.push(prevState[i])
                                }
                            }
                        }
                        newList.push(task);
                        fetchTasks(familyID, newList, null, "reward");
                        return newList;
                    }))      
                } else{
                    setListReward([task]);
                    fetchTasks(familyID, [task], null, "reward");
                }    
            }   
        }      
    }
    const repost = (task)=>{
        let dup = false;
        for(let i = 0; i < listTask.length; i++){
            console.log(listTask[i])
            if(task.task === listTask[i].task && task.value === listTask[i].value){
                dup = true;
            }
        }
        return dup;
    }
    // console.log(page)
    const updateTask = (list, action, category) =>{
        const newList = [];     
        let _points = 0;
        if(category === null){
            const task = list.task;
            listTask.map((val, index)=>{
                if(!permission){
                    //if this is a child's account
                    if(val.task === task){
                        if(val.score === 0){
                            //signifies that task is in progress
                            val.score = 1;
                            val.completedBy = userName;
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
                    } else if(val.task === task && val.value !== list.value){
                        //delete identical tasks.  keep similar tasks but only if they have different values   
                        newList.push(val)
                    }else{
                        // determine if task has been completed or not
                        if(action === "quit"){
                            val.score = 0;
                            newList.push(val)
                        } else{
                            if(val.hasOwnProperty("completedBy")){
                                _points = val.value;
                                updateMember(val.completedBy, _points, null);    
                            }    
                        }                   
                    }
                }      
            }) 
            permission === true ? fetchTasks(familyID, newList, null, "task") : fetchTasks(infoId, newList, null, "task");
            setListTask(newList);  
        } else{
            const reward = list.reward;
            if(permission){
                listReward.map((val, index)=>{
                    if(val.reward !== reward){
                        // keep old rewards
                        newList.push(val);
                    } else if(val.reward === reward && val.value !== list.value){
                        //delete identical rewards.  keep similar rewards but only if they have different values   
                        newList.push(val)
                    }            
                })
                setListReward(newList);
                fetchTasks(familyID, newList, null, "reward");
            }
            else{
                _points = list.value;
                updateMember(userName, _points, "buy");
            }
        }
    }

    const fetchTasks = async (id, arr, arr2, type)=>{ 
        arr = JSON.stringify(arr);
        arr2 = JSON.stringify(arr2);
        console.log(arr2)
        const array = type === "fav" ? {favorites: arr, taskList: arr2, type} : type === "task" ? {taskList: arr, type} : {RewardList: arr, type};
        const route = type === "reward" ? "rewards" : "tasks";
        // add rewards list and make route more dynamic (tasks/rewards)
        await fetch(`/${route}/${id}`, {
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
    const updateMember = async (memberName, pts, action)=>{ 
        let total = pts;
        await fetch(`/dashboard/${memberName}`)
        .then(response => response.json())
        .then((data)=> {
            const {pPts} = data;
            if(action === "buy"){
                total = pPts - pts;
            } else{
                total += pPts;
            }
            updatePoints(total, memberName)
        })
        .catch((err)=>{
            console.log(err)
        })       
    }
    // const updatePoints = (total, memberName)=>{
    //     fetch("/users", {
    //         method: "put",
    //         headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             userName: memberName,
    //             ppts: total
    //         })
    //     }) 
    //     .then(response => response.json())
    //     .then((data)=> {
    //         console.log(data)
    //         setPoints(total);
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     }) 
    // }

    //Update information once changed
    const updateCall = ()=>{
        const url = window.location.href.split("/dashboard/")[1].replace(/%20/g, " ");
        const cat = url.split("/")[0];
        let _userName = url.split(`${cat}/`)[1];    
        const tempObj = {};    
        if(!contextUserName){
            if(!_userName){
                setLoading(false);
                setError(true);
                return;    
            }   
        } else{
            _userName = contextUserName;
        }
        tempObj.userName = _userName;
        tempObj.category = cat;
        return tempObj;
     
        // setPage(cat);
        // userInfo(cat,_userName);

    }
    const taskCall = async (id, obj)=>{
        await fetch(`/tasks/${id}`)
        .then(response => {
            return response.json()
        }).then(data => {
            const { Task, Reward } = data;
            let taskList = Task.taskList !== undefined ? JSON.parse(Task.taskList) : [];
            let rewardList = Reward.RewardList !== undefined ? JSON.parse(Reward.RewardList) : [];
            setListTask(taskList);
            setListReward(rewardList); 
            setPoints(obj.pPts);
            setInfoId(obj.accessId)
            setFamilyID(obj.familyId)
            setUserPass(obj.password); 
            setUserName(obj._userName)
            setFirst(obj.firstName);
            setLast(obj.lastName); 
            setLoading(false);
            setContext(obj.accessId, obj.familyID, obj._userName, obj.permission);
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
    const userInfo = async (cat,_userName)=>{
        await fetch(`/dashboard/${_userName}`)
        .then(response => {
            if(response.redirected && response.url.includes("/login")){
                window.location.href = "/login"
            }
            return response.json()
        }).then(data => {
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
            let taskList;   
            let rewardList;
            if(primary){
                taskList = (Task.taskList === undefined || Task.taskList === null) ? [] : JSON.parse(Task.taskList);   
                rewardList = (Reward.RewardList === undefined || Reward.RewardList === null) ? [] : JSON.parse(Reward.RewardList);
                const taskFavs = JSON.parse(Task.favorites);
                // const rewardFavs = Reward.RewardList;
                const acctList = JSON.parse(secondaryAccts); 
                setPermission(true);
                // setFavReward(rewardFavs);
                setFavTask(taskFavs);
                setEmail(email);
                setSecondaryUsers(acctList);
                setListTask(taskList);
                setListReward(rewardList);
                setPoints(pPts);
                setInfoId(accessId)
                setFamilyID(familyId)
                setUserPass(password); 
                setUserName(_userName)
                setFirst(firstName);
                setLast(lastName); 
                setLoading(false);
                if(cat === "tasks"){
                    console.log(cat)
                    setContext(accessId, familyId, _userName, points, permission)
                }
            } else{
                const obj = {};
                obj.permission = permission;
                obj.pPts = pPts;
                obj.accessId = accessId;
                obj.familyID = familyId;
                obj.password = password; 
                obj._userName = _userName;
                obj.firstName = firstName;
                obj.lastName = lastName; 
                taskCall(accessId, obj);
            }   
        })
        .catch(error => console.log(error));
    } 
    const if_Fav = ()=>{
        if(favTask){
            console.log(favTask.length)
            if(favTask.length > 0){
                return true;
            }
            return false;
        } else{ 
            return false;
        }
    }

    const check = "fluent-emoji-high-contrast:check-mark-button";
    const star = "emojione:star";
    const reward = "material-symbols:price-change-outline-rounded";
    const heart = "ic:twotone-favorite";
    const addBuy = "material-symbols:add-comment-outline-sharp";
    const addBuyText = permission ?  "Add/Edit" : "Buy";
    const InfoCard = ({currentPage})=>{
        return(
            <>
                <h4 className="lists_subHeader">This is your {currentPage === "tasks" ? "Task List" : currentPage === "rewards" ? "Reward List" : "Favorites List"}</h4>
                <hr></hr>
                <div className="d-flex cardSection">
                    <div className="listCard">
                        <Icon className="card-img-top dashIcon" 
                            icon={currentPage === "tasks" ? check : currentPage === "favorite-tasks" ? heart : star} 
                            style={currentPage !== "favorite-tasks" ? {color:"#337cd7"} : {color: "#fd0531"}} 
                        />
                        <p className="iconText text-center">
                            {(currentPage === "tasks" && permission) ? "Start by Adding a task" : (currentPage === "tasks" && !permission) 
                            ? "Click to Start a task" : (currentPage === "rewards" && !permission) ? <>You have: <span className="spanStyle">{points}</span> stars</> 
                            : currentPage === "favorite-tasks" ? "Save Common Tasks Here" : "Get Stars by finishing tasks"}
                        </p>
                    </div>
                    <div className="listCard">
                        <Icon className="card-img-top dashIcon" 
                            icon={(currentPage === "tasks" && !permission) ? star : (currentPage === "rewards" && !permission) ? addBuy : currentPage === "favorite-tasks" ? check : reward}  
                            style={{color:"#16bf16"}}
                        />
                        <p className="iconText text-center">
                            {(currentPage === "tasks" && permission) ? "Next, add a reward" : (currentPage === "tasks" && !permission) ? "Get Stars when you're done" :
                            (currentPage === "rewards" && permission) ? "Buy Rewards with Stars" : currentPage === "favorite-tasks" ? "Easily Repost to Task List": "Get more by completing tasks"}
                        </p>
                    </div>
                    <div className="listCard">
                        <Icon className="card-img-top dashIcon" 
                            icon={(currentPage === "tasks" && permission) ? heart : (currentPage === "rewards" && !permission) ? reward : addBuy} 
                            style={{color: "#fd0531"}}
                        />
                        <p className="iconText text-center">
                            {(currentPage === "tasks" && permission) ? "Repost easily w/ favorites" :
                                (currentPage === "tasks" && !permission) ? "Spend on the Rewards Page" :
                                currentPage === "rewards" ? `${addBuyText} Rewards Here`: currentPage === "favorite-tasks" ? "Favorites can't be edited" : "Add Favorites in your task list"}
                        </p>
                    </div>
                </div>
                <hr></hr>
            </>
            
            
        )
    }
    const ListDisplay = ({cat})=>{
        return(
            <>           
                <div className="col-sm-5 col-md-7 col-lg-8">
                    <div className="card borderDiv" id="list_m">
                        <div className="card inner-card">
                            <h1 className="lists_Header">Hello {first}!</h1>
                            {cat === "/tasks/*" ? <InfoCard currentPage={"tasks"}/> 
                                : cat === "/favorite-tasks/*" ?  <InfoCard currentPage={"favorite-tasks"}/> 
                                : <InfoCard currentPage={"rewards"}/>}
                        </div>    
                    </div>    
                </div>
                <div className="col-sm-7 col-md-5 col-lg-4">
                    {cat === "/tasks/*" ? 
                     <ListContainer 
                        list={listTask} 
                        favs={null} 
                        rewards={null}
                        submit={updateTask} 
                        addTask={addTask} 
                        permission={permission} 
                        favorite={fav}
                        repost={repost}
                        page={"tasks"}
                        if_Fav={if_Fav()}
                    /> : cat === "/favorite-tasks/*" ?
                    <ListContainer 
                        list={null} 
                        favs={favTask} 
                        rewards={null}
                        submit={updateTask} 
                        addTask={addTask} 
                        permission={permission} 
                        favorite={fav}
                        repost={repost}
                        page={"favorite-tasks"}
                        if_Fav={if_Fav()} 
                    /> :
                    <ListContainer 
                        list={null} 
                        favs={null} 
                        rewards={listReward}
                        submit={updateTask} 
                        addTask={addTask} 
                        permission={permission} 
                        favorite={fav}
                        repost={repost}
                        page={"rewards"}
                        if_Fav={if_Fav()}
                    />
                }
                </div>
            </> 
        )
    }

    if(!loading){
            return(
                <>
                    <DashNavBar paginate={paginate} permission={permission} page={page}/>
                    <div className="container-fluid dashboard-container">
                        <div className="row pt-4 pb-4" style={{minHeight: 500}}>
                            <Routes>
                                <Route path="/tasks/*" element={<ListDisplay cat={"/tasks/*"}/>}/>   
                                <Route path="/favorite-tasks/*" element={<ListDisplay cat={"/favorite-tasks/*"}/>}/>   
                                <Route path="/rewards/*" element={<ListDisplay cat={"/rewards/*"}/>}/>
                                <Route path="/account-info/*" element={
                                    <EditAccountForm 
                                        firstName={first} 
                                        lastName={last} 
                                        email={eMail} 
                                        _userName={userName}
                                        // businessName={businessName}
                                        // update={paginate}
                                    />
                                }/>   
                                <Route path="/password/*"element={<EditPasswordForm userName={userName}/>}/>    
                            </Routes>        
                        </div> 
                    </div>
                    <Footer permission={permission}/>

                     
                </>
                

                
            )     
      

    } else{
        return (
            <>
                <DashNavBar paginate={paginate} permission={permission} page={page}/>
                <div className="container-fluid dashboard-container" style={{minHeight: 500}}>
                    <LoadingSpinner message={"Loading..."}/> 
                </div>
                <Footer permission={permission}/>
            </> 
            
        ) 
    }
       
    
}

export default Dashboard;