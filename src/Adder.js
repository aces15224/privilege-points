import React, {useState} from 'react';
const Adder = ()=>{
    const [selectInput, setSelectInput] = useState("text");
    const [taskName, setTaskName] = useState("Add Task");
    console.log(taskName)
    const _input = (
        <>
            <input
                type="text"
                // id="password1"
                // name="password1"
                // className="form-control"
                // placeholder="Enter Password"
                value={taskName}
                onChange={(e)=>setTaskName(e.target.value)}
            />
            <button>Next</button>
        </>
    );
    // const _valueInput = (
    //     <>
    //         <input/><button>Next</button>
    //     </>
    // )
    return(
        <li style={{listStyleType: "none", margin: "0.1rem", borderRadius: "0.25rem", border: "1px solid #a9a9ab"}}>
            <div className="card taskCard" style={{height: "45px"}}>
                <div className="d-flex" style={{height: "100%", alignItems: "center", padding: 1, color: "black", fontFamily: "serif"}}>
                    {_input}
                </div>
            </div>
        </li>
    )
}

export default Adder;