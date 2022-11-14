import React, {useState, useEffect} from 'react';
import { Icon } from '@iconify/react';

import Adder from './Adder'
const ListContainer = ({list, favs, submit, addTask, favorite, permission})=>{
    const [match, setMatch] = useState(null)
    useEffect(()=>{
        console.log(match)

    },[match])

    const _addTask = (obj, prevTask)=>{
        setMatch(null);
        addTask(obj, prevTask);
        console.log("success")
        console.log(obj)
        console.log(prevTask)
    };
    const BtnGroup1 = (task, val)=>{
        return (
            <div style={{width: "30%", padding: "5px", marginBottom: 0, display: "flex", justifyContent: "end"}}>
                <Icon style={{color: "black"}} icon="ci:edit" onClick={()=>setMatch(task)} />
                <Icon style={{color: "black"}} icon="material-symbols:delete-forever" onClick={()=> submit(task)} /> 
                <Icon icon="ic:twotone-favorite" onClick={()=> favorite(val)} />
            </div>
        )
    }
    const BtnGroup2 = (task)=>{
        return(
            <div style={{width: "30%", padding: "5px", marginBottom: 0, display: "flex", justifyContent: "end"}}>
                {/* incomplete */}
                <Icon style={{color: "red"}} icon="akar-icons:circle-x" />
                {/* complete */}
                <Icon style={{color: "green"}} icon="fluent-mdl2:completed" onClick={()=> submit(task)}/> 
            </div>    
        )
    }
    const BtnGroup3 = (task)=>{
        return (
            <div style={{padding: "5px", marginBottom: 0, display: "flex", justifyContent: "end"}}>
                <button class="btn-primary mr-1" onClick={()=> submit(task)}>Start</button>                
                {/* <button class="btn-danger">Finish</button> */}
            </div>
        )
    }
    const BtnGroup4 = (task)=>{
        return(
            <div style={{width: "30%", padding: "5px", marginBottom: 0, display: "flex", justifyContent: "end"}}>
                <button class="btn-primary mr-1" onClick={()=> submit(task, "quit")}>Quit</button>                
                <button class="btn-danger" onClick={()=> submit(task, "finish")}>Finish</button>
            </div>    
        )
    }
                               

    return(
        <div className="offset-3 col-6">
            <div className="card m-auto" style={{padding: 2, backgroundColor: "rgb(79 104 126)", border: "1px solid rgb(126 117 117)", maxWidth: "350px", minHeight: "368px", boxShadow: "0 0 5px white"}}>
                <div className="card" style={{border: "1px solid rgb(200 202 205 / 91%)", minHeight: "368px", backgroundColor: "#d6e8ffe8"}}>
                    <ul style={{padding:0, marginBottom: 0}}>
                        {(permission && match === null) ? <Adder addTask={addTask} current={null} /> : !permission ? <></> :
                        <li style={{listStyleType: "none", margin: "0.1rem", borderRadius: "0.25rem", border: "1px solid #a9a9ab"}}>
                            <div className="card taskCard" style={{backgroundColor: "white", height: "45px"}}></div>
                        </li>
                        }
                        {list.map((val, index)=>{
                            let task = val.task;
                            const taskStyle = val.score === 1 ? {backgroundColor: "white", height: "45px"} : {backgroundColor: "white", height: "45px"}
                            const btnSelection = permission && val.score < 2 ? 
                                <BtnGroup1 task={task} val={val}/> : permission && val.score === 2 ? 
                                <BtnGroup2 task={task}/> : val.score === 0 ? 
                                <BtnGroup3 task={task}/> : val.score === 1 ? 
                                <BtnGroup4 task={task}/> :
                                <div style={{width: "30%", padding: "5px", marginBottom: 0, display: "flex", justifyContent: "end"}}>
                                    <p style={{marginBottom: 0}}>Checking...</p>
                                </div> 
                                ;
                            // <div style={{width: "30%", padding: "5px", marginBottom: 0, display: "flex", justifyContent: "end"}}>
                            //     <Icon style={{color: "black"}} icon="ci:edit" onClick={()=>setMatch(task)} />
                            //     <Icon style={{color: "black"}} icon="material-symbols:delete-forever" onClick={()=> submit(task)} /> 
                            //     <Icon icon="ic:twotone-favorite" onClick={()=> favorite(val)} />
                            // </div>
                            // :
                            // <div style={{width: "30%", padding: "5px", marginBottom: 0, display: "flex", justifyContent: "end"}}>
                            //     <Icon style={{color: "red"}} icon="akar-icons:circle-x" />
                            //     <Icon style={{color: "green"}} icon="fluent-mdl2:completed" onClick={()=> submit(task)}/> 
                            // </div>

                            if(task === match){
                                return(
                                    <Adder addTask={_addTask} current={val}/> 
                                )
                            } else{
                                return(
                                    <li style={{listStyleType: "none", margin: "0.1rem", borderRadius: "0.25rem", border: "1px solid #a9a9ab"}}>
                                        <div className="card taskCard" style={taskStyle}>
                                            <div className="d-flex" style={{height: "100%", alignItems: "center", padding: 1, color: "black", fontFamily: "serif"}}>
                                                <p style={{width: "50%", padding: "5px", marginBottom: 0}}>{task}</p>
                                                <div className="d-flex" style={{width: "15%", padding: "5px", alignItems: "center"}}>
                                                    <p style={{marginBottom: 0}}>{val.value}</p>
                                                    <Icon icon="emojione:star" />
                                                </div>
                                                { btnSelection }         
                                            </div>
                                        </div>
                                    </li>
                                )

                            }
                                
                            
                        })}
                    </ul>     
                </div>
                   
            </div>
           
        </div>
    )
}

export default ListContainer;