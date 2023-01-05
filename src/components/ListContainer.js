import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from '../App';
import { Icon } from '@iconify/react';
import ListItem from './ListItem';
import Adder from './Adder';


const ListContainer = ({list, favs, submit, addTask, favorite, permission, page, if_Fav, rewards, repost})=>{
    const [match, setMatch] = useState(null);
    const {userName} = useContext(AuthContext);

    useEffect(()=>{

    },[match])

    const _addTask = (obj, prevTask)=>{
        setMatch(null);
        addTask(obj, prevTask);
    };

    const _addFav = (val)=>{
        console.log(val)
        val.fav = val.fav === false ? true : false;
        favorite(val);
    }
   
    const header = list !== null ? "Current Tasks" : favs !== null ? "Favorites" : "Rewards";
    const linkText = list !== null ? "Favorites" : "Task List";
    const link_to = list === null ? `/dashboard/tasks/${userName}`: `/dashboard/favorite-tasks/${userName}`;

    return(
        // <div className="offset-3 col-6"">
            <div className="card m-auto borderDiv">
                <div className="card" style={{border: "1px solid rgb(200 202 205 / 91%)", height: "100%", backgroundColor: "#d6e8ffe8"}}>
                    {(list !== null && list.length < 1 && !permission) ? 
                        <div className="m-auto">
                            <h1 class="text-center">You're Awesome!</h1>
                            <h6 class="text-center" style={{textDecoration: "underline"}}>You've completed all of your tasks</h6>
                        </div> :
                        (rewards !== null && rewards.length < 1 && !permission) ? 
                        <div className="m-auto">
                            <h6 class="text-center" style={{textDecoration: "underline"}}>No rewards listed!</h6>
                        </div> :
                        <ul style={{padding:0, marginBottom: 0}}>                        
                            {permission &&
                                <li style={{listStyleType: "none", margin: "0.1rem", borderRadius: "0.25rem", border: "1px solid #a9a9ab"}}>
                                    <div className="card taskCard" style={{backgroundColor: "white", height: "45px"}}>
                                        <div className="d-flex m-auto" style={{alignItems: "baseline", padding: 1, color: "black", fontFamily: "serif"}}>
                                            <h4 class="mb-0 mr-2">{header}</h4>
                                            {(if_Fav && rewards === null) && <Link className="mb-0 listLink" to={link_to}>{linkText}</Link>}
                                        </div>
                                    </div>
                                </li>
                            }
                            {/* if no permission or if favorites or if editing */}
                            {/* rework if else below.  no need for second ADDER */}
                            {(!permission || favs!== null || match !== null)? <></> 
                            : permission && list !== null ? <Adder exit={setMatch} addTask={addTask} current={null} category={"tasks"} list={list}/> 
                            : <Adder exit={setMatch} addTask={addTask} current={null} category="rewards" list={rewards} />}
                            {   (favs === null && list === null) ? rewards.map((val, index)=>{
                                    const reward = val.reward;
                                    if(reward === match){
                                        return(
                                            <Adder exit={setMatch} addTask={_addTask} current={val} category={"rewards"} list={rewards}/> 
                                        )
                                    }
                                    else{
                                        // type, val, func1, func2, func3, func4
                                        return(
                                            <ListItem 
                                                permission={permission}
                                                repost={repost}
                                                type={"rewards"}
                                                val={val}
                                                func1={submit}
                                                func2={setMatch}
                                                func3={null}
                                                func4={null}
                                            />
                                        )
                                    }  
                                }) :                            
                                (list !== null && list.length > 0) ? list.map((val, index)=>{
                                    let task = val.task;
                                    console.log(task)
                                    console.log(match)
                                    const taskStyle = val.score === 1 ? {backgroundColor: "white", height: "45px"} : {backgroundColor: "white", height: "45px"}
                                    if(task === match){
                                        return(
                                            <Adder exit={setMatch} addTask={_addTask} current={val} category={"tasks"} list={list}/> 
                                        )
                                    } else{
                                        return(
                                            <ListItem 
                                                permission={permission}
                                                repost={repost}
                                                type={"tasks"}
                                                val={val}
                                                func1={submit}
                                                func2={setMatch}
                                                func3={_addFav}
                                                func4={addTask}
                                            />
                                        )
                                    }                            
                                }):
                                (list !== null && list.length < 1 && permission) ? <></> :
                                favs.map((val, index)=>{
                                    return(
                                        <ListItem 
                                            permission={permission}
                                            repost={repost}
                                            type={"favs"}
                                            val={val}
                                            func1={null}
                                            func2={null}
                                            func3={_addFav}
                                            func4={addTask}
                                        />
                                    )
                                })
                            }
                        </ul>   
                    }       
                </div>             
            </div>       
        // </div>
    )
}

export default ListContainer;