import React, {useState, useEffect} from 'react';
const Adder = ({addTask, current})=>{
    const [selectInput, setSelectInput] = useState("text");
    const [taskName, setTaskName] = useState();
    const [prevTask, setPrevTask] = useState();
    const [taskValue, setTaskValue] = useState();

    const btn = {display:"block", width: "30%", height: "100%"}

    useEffect(()=>{
        if(current !== null){
            setTaskValue(current.value);
            setTaskName(current.task);
            setPrevTask(current.task);
        }
    },[])

    const handleSubmit = ()=>{
        const obj = {};
        obj.task = taskName;
        const val = Number(taskValue);
        obj.value = val;
        obj.score = 0;
        current !== null ? addTask(obj, prevTask) : addTask(obj, null);
        setSelectInput("text");
        setTaskName(undefined);
        setTaskValue(undefined);
        setPrevTask(undefined);
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
                placeholder="Enter Task"
                value={taskName === undefined ? "Enter Task" : taskName}
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
            <div className="card taskCard" style={{height: "45px"}}>
                <div className="d-flex" style={{height: "100%", alignItems: "center", padding: 1, color: "black", fontFamily: "serif"}}>
                    {selectInput === "text" ? _input : _valueInput}
                </div>
            </div>
        </li>
    )
}

export default Adder;