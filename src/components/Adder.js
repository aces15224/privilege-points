import React, {useState, useEffect} from 'react';
const Adder = ({addTask, current, category, list, exit})=>{
    const [selectInput, setSelectInput] = useState("text");
    const [taskName, setTaskName] = useState();
    const [prevTask, setPrevTask] = useState();
    const [taskValue, setTaskValue] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const btn = {display:"block", width: "30%", height: "100%"}

    useEffect(()=>{
        if(current !== null){
            if(category === "tasks"){
                setTaskValue(current.value);
                setTaskName(current.task);
                setPrevTask(current.task);    
            } else{
                setTaskValue(current.value);
                setTaskName(current.reward);
                setPrevTask(current.reward);      
            }  
        }
    },[])
    console.log(current)
    const timeOut = (obj = null, prevTask)=>{
        console.log("Time Out")
        setTimeout(()=>{
            setSelectInput("text");
            setTaskName(undefined);
            setTaskValue(undefined);
            setPrevTask(undefined);
            console.log(obj)
            if(obj !== null){
                addTask(obj, prevTask);

            }
            // if(obj){
            // }
            exit(null)
            // console.log(selectInput)
        },2000)    
    }
    const handleSubmit = ()=>{
        const val = Number(taskValue);
        const obj = {};
        // obj.value = val;
        obj.value = val;

        if(!taskName || isNaN(val)){
            if(!isNaN(val)){
                if(current!== null){
                    if(category === "tasks"){
                        obj.task = !taskName ? current.task : taskName;
                        obj.score = 0;
                        obj.fav = current.fav;
                    } else{
                        obj.reward = current.reward;
                    } 
                    if(duplicateCheck(val) === true){
                        setSelectInput("error");
                        setErrorMessage("No Duplicate Entries");
        
                    } else{
                        setSelectInput("submit");     

                        timeOut(obj, prevTask)
                        // addTask(obj, prevTask);
                        // setSelectInput("submit");     
                    } 
                }
            } else{
                setSelectInput("error");
                setErrorMessage("Invalid Values");    
            }
            timeOut()
            
        } else{
            if(category === "tasks"){
                obj.task = taskName;
                obj.score = 0;
                obj.fav = false;
            } else{
                obj.reward = taskName;
            } 
            if(duplicateCheck(val) === true){
                setSelectInput("error");
                setErrorMessage("No Duplicate Entries");
                timeOut()            
            } else{
                setSelectInput("submit");
                timeOut()            
                current !== null ? timeOut(obj, prevTask) : timeOut(obj, null);
                // setSelectInput("submit");     
            }  
        }
       
    }

    const duplicateCheck = (val)=>{
        let duplicate = false;
        if(list.length > 0){
            for(let i = 0; i < list.length; i++){
                if(category === "tasks"){
                    if(list[i].task === taskName && list[i].value === val){
                        duplicate = true;
                        break;
                    } 
                } else{
                    if(list[i].reward === taskName && list[i].value === val){
                        duplicate = true;
                        break;
                    }
                }
            }    
        }
        return duplicate;     
    }

    const _placeholder = ()=>{
        if(category === "tasks"){
            return current !== null ? current.task : "Enter Task"
        } else{
            return current !== null ? current.reward : "Enter Reward"
        }
    }

    // ADD VALIDATION FOR INPUT ////////
    const _input = (
        <>
            <input
                type="text"
                id="taskInput"
                style={{height:"100%", width:"70%", border: "none"}}
                // name="password1"
                // className="form-control"
                placeholder={_placeholder()}
                // value={taskName !== undefined ? "Enter Task" : taskName}
                onChange={(e)=>setTaskName(e.target.value)}
            />
            <button className="btn btn-primary" style={btn} onClick={()=> setSelectInput("value")}>{current === null ? "Next" : "Edit Task" }</button>
        </>
    );
    
    const _valueInput = (
        <>
            <input 
                type="number"
                style={{height:"100%", width:"70%"}}
                placeholder="Enter Point Value"
                value={taskValue === undefined ? "Enter Point Value" : taskValue}
                onChange={(e)=>setTaskValue(e.target.value)}
            />
            <button className="btn btn-success" style={btn} onClick={handleSubmit}>{current === null ? "Save" : "Edit Value"}</button>
        </>
    );
    
    return(
        <li style={{listStyleType: "none", margin: "0.1rem", borderRadius: "0.25rem", border: "1px solid #a9a9ab"}}>
            <div className="card taskCard" 
                style={selectInput === "submit" ? {backgroundColor: "#3edb3e", height: "45px"} : selectInput ===  "error" ? {backgroundColor: "red", height: "45px"} : {height: "45px"}}>
                <div className="d-flex" style={{height: "100%", alignItems: "center", padding: 1, color: "black", fontFamily: "serif"}}>
                    {selectInput === "text" ? 
                        _input : selectInput === "value" ?
                        _valueInput : selectInput === "submit" ?
                        <p className="mb-0 m-auto" style={{color: "white", fontWeight:"bold"}}>Submitted</p>:
                        <p className="mb-0 m-auto" style={{color: "white", fontWeight:"bold"}}>{errorMessage}</p>
                    }
                </div>
            </div>
        </li>
    )
}

export default Adder;