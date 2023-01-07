import React, {useState, useEffect, useContext} from 'react';
import { Icon } from '@iconify/react';
import {AuthContext} from '../App';

const ListItem = ({permission, repost, type, val, func1, func2, func3, func4})=>{
    const {context_points} = useContext(AuthContext);
    

    useEffect(()=>{
        console.log(context_points)
    },[])

    const [selectStyle, setSelectStyle] = useState("default");
    const [message, setMessage] = useState(null);
    const title = type === "rewards" ? val.reward : val.task;

    const repostHandler = (item, dup)=>{
        // const dup = repost(item);
        console.log(dup)

        if(!dup){
            func4(item)
        }
        // func4(item)

    }

    const _linePlease = (item, action, category)=>{
        let dup;
        let error = false;
        const cat = category === "reward" ? "reward" : null;
        if(action === "delete" || action === "remove" || action === "quit"){
            action !== "quit" ? setMessage("Removed") : setMessage("Marked Incomplete");
            setSelectStyle("delete");
        } else if (action === "submit" || action === "complete" || action === "repost"){
            if(action === "repost"){
                dup = repost(item);
                if(dup){
                    setSelectStyle("delete");
                    setMessage("Task Exists");
                } else{
                    setMessage("Reposted");
                    setSelectStyle("submit");
                }
            } else{
                action === "complete" ? setMessage("Marked Complete!") : setMessage("Reposted");
                setSelectStyle("submit");       

            }
        //     action === "complete" ? setMessage("Marked Complete!") : setMessage("Reposted");
        //     setSelectStyle("submit");
        } else{
            if(context_points <= 0){
                error = true;
                setSelectStyle("delete");
                setMessage("You have Zero Points");
            } else{
                if(context_points < item.value){
                    error = true;
                    console.log("<")
                    setSelectStyle("delete");
                    setMessage("Not Enough Points");

                } else{
                    setMessage("Points Used");
                    setSelectStyle("submit");  
                }     
            }
                        
        }
        setTimeout(()=>{   
            if(!error){
                action === "repost" ? repostHandler(item, dup) :
                action === "delete" ? func1(item, "delete", cat)
                : action === "buy" ? func1(item, action, cat)
                : action === "remove" ? func3(item) 
                : action === "quit" ? func1(item, "quit", null)
                : func1(item, null, null);    
            }       
            error = false;
            setMessage(null);
            setSelectStyle("default") 
        }, 3000)
    }
    const BtnGroup1 = ({val})=>{
        console.log(val)
        const favStyle = val.fav === false ? {} : {color: "#fd0531"};
        return (
            <>
            {/* edit, delete, favorite */}
                <Icon style={{color: "black"}} icon="ci:edit" onClick={()=>func2(val.task)} />
                <Icon style={{color: "black"}} icon="material-symbols:delete-forever" onClick={()=> _linePlease(val, "delete")} /> 
                <Icon style={favStyle} icon="ic:twotone-favorite" onClick={()=> func3(val)} />
            </>
        )
    }
    const BtnGroup2 = (task)=>{
        task = task.task;
        return(
            <>
                {/* incomplete */}
                <Icon style={{color: "red", fontSize: "1.3em", margin: 3}} icon="akar-icons:circle-x" onClick={()=> _linePlease(task, "quit", null)}/>
                {/* complete */}
                <Icon style={{color: "green", fontSize: "1.3em", margin: 3}} icon="fluent-mdl2:completed" onClick={()=> _linePlease(task, "complete")}/> 
            </>        
                
        )
    }
    const BtnGroup3 = (task)=>{
        task = task.task;
        return (
                <button class="btn-primary" style={{width: "100%", height: "100%"}} onClick={()=> func1(task, null, null)}>Start</button>                            
        )
    }
    const BtnGroup4 = (task)=>{
        task = task.task;
        return(
            <>
                <button class="mr-1 btn-danger" style={{width: "50%", height: "100%"}} onClick={()=> func1(task, "quit", null)}>Quit</button>                
                <button class="btn-success" style={{width: "50%", height: "100%"}} onClick={()=> func1(task, "finish", null)}>Finish</button>
            </>      
                
        )
    }
    const BtnReward = (val)=>{
        return(
            <>
                {permission ? 
                    <>
                        <Icon style={{color: "black"}} icon="ci:edit" onClick={()=>func2(val.reward)} />
                        <Icon style={{color: "black"}} icon="material-symbols:delete-forever" onClick={()=> _linePlease(val, "delete", "reward")} /> 
                    </> :                 
                    <button class="btn-primary" style={{width: "100%"}} onClick={()=> _linePlease(val, "buy", "reward")}>Buy</button>                            
                }  
            </>
               
        )  
    }

    const BtnFavs = (val)=>{
        return(
            <>
                <button class="btn-danger mr-1" style={{height: "100%"}} onClick={()=> _linePlease(val, "remove")}>Remove</button>                
                <button class="btn-success" style={{height: "100%"}} onClick={()=> _linePlease(val, "repost")}>Repost</button>
            </>    
        )
    }
    const btnSelection = (val) =>{
        return permission && val.score < 2 ? 
        <BtnGroup1 val={val}/> : permission && val.score === 2 ? 
        <BtnGroup2 task={val}/> : val.score === 0 ? 
        <BtnGroup3 task={val}/> : val.score === 1 ? 
        <BtnGroup4 task={val}/> : <p style={{marginBottom: 0}}>Checking...</p>;

    } 
    
    return(
        <li style={{listStyleType: "none", margin: "0.1rem", borderRadius: "0.25rem", border: "1px solid #a9a9ab"}}>
            <div className="card taskCard" 
                style={selectStyle === "submit" ? 
                    {backgroundColor: "#3edb3e", height: "45px"} :
                    selectStyle === "delete" ? {backgroundColor: "red", height: "45px"} :
                    {backgroundColor: "white", height: "45px"}
                }>
                    <div className="d-flex" style={{height: "100%", alignItems: "center", padding: 1, color: "black"}}>
                    {selectStyle === "default" ?
                        <>
                            <p className="orbFont" style={{width: "50%", padding: "5px", marginBottom: 0}}>{ title }</p>
                            <div className="d-flex" style={{width: "12%", alignItems: "center"}}>
                                <p className="orbFont" style={{marginBottom: 0}}>{val.value}</p>
                                <Icon icon="ic:twotone-star"  style={{color:"rgb(255, 206, 49)", fontSize: "1.1em"}}/>
                            </div>
                            <div style={{height: "100%", width: "40%", alignItems: "center", marginRight: 2, marginBottom: 0, display: "flex", justifyContent: "end"}}>
                                {type === "tasks" ? btnSelection(val) : type === "rewards" ? BtnReward(val) : BtnFavs(val)}    
                            </div>
                        </>:
                        <p className="mb-0 m-auto" style={{color: "white", fontWeight:"bold"}}>{message}</p>
                    }
                            

                    </div>
            </div>
        </li>
    )    
}

export default ListItem;