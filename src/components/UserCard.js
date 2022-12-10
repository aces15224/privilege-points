import React, { useState, useEffect, useContext } from 'react';
import {AuthContext} from "../App";

import { Icon } from '@iconify/react';
import EditUserForm from "./EditForm";

const UserCard = ({info, deleter, setSelected})=>{
    console.log(info)
    const {updatePoints} = useContext(AuthContext);
    const [points, setPoints] = useState(0);
    const [initial, setInitial] = useState(info.firstName.split("")[0]);
    const [edit, setEdit] = useState(false);
    const [saving, setSaving] = useState(false)
    // const [destroy, setDestroy] = useState(false)
    useEffect(()=>{
        const _initial = info.firstName.split("")[0];
        console.log(_initial)

        if(points !== 0){
            setPoints(points) ;
            setInitial(_initial);  
            setSaving(false);

        } else{
            setPoints(info.pPts);
            setSaving(false);
            setInitial(_initial);
        }        

    },[points]);
    const [btnChoice, setBtnChoice] = useState("default"); //default, points, delete, destroy
    const btnStyle = {
        background: "none",
        border: "3px solid #272133",
        cursor: "pointer",
        lineHeight: "1.5",
        font: "700 1rem 'Roboto Slab', sans-serif",
        padding: "0.5em",
        letterSpacing: "0.05rem",
        boxShadow: "inset 0 0 0 4px #58cdd1",
        color: "#58afd1",
        width: "100%"
    }
    const btnStyle2 = {
        background: "none",
        border: "3px solid #272133",
        cursor: "pointer",
        lineHeight: "1.5",
        font: "700 1rem 'Roboto Slab', sans-serif",
        padding: "0.5em",
        letterSpacing: "0.05rem",
        boxShadow: "inset 0 0 0 4px #58cdd1",
        color: "#58afd1",
        width: "49.5%"
    }
    const btnStyle3 = {
        background: "none",
        border: "3px solid #272133",
        cursor: "pointer",
        lineHeight: "1.5",
        font: "700 1rem 'Roboto Slab', sans-serif",
        padding: "0.5em",
        letterSpacing: "0.05rem",
        boxShadow: "inset 0 0 0 4px rgb(88 209 103)",
        color: "rgb(88 209 103)",
        width: "100%"
    }

    const defaultStyle= {position:"relative", minHeight: 402};
    const destroyStyle = {position:"relative", minHeight: 402, boxShadow: "0 0 5px white", opacity: "90%"};

    const reset = ()=>{
        setBtnChoice("default")
    }

    const _deleteUser = ()=>{
        setBtnChoice("destroy");
        setTimeout(()=>{
            deleter(info.familyId);
        }, 1000)
     
    }
    const _default = ()=>{
        return(
            <>
                <button className="btn d-block mb-1 btnStyle" onClick={()=>setBtnChoice("points")}>Points</button>
                <button className="btn d-block mb-1 btnStyle " onClick={()=>setSelected(info)}>Edit</button>
                <button className="btn d-block mb-1 btnStyle" onClick={()=>setBtnChoice("delete")}>Delete</button>
            </>
        )
    }
    const _btnMessage = (_points, _userName)=>{
        setSaving(true);
        updatePoints(_points, _userName);
        setTimeout(()=>{
            setPoints(_points)
            setSaving(false)
        }, 3000)
    }
    const _points = ()=>{

        return(
            <>  
                <div className="d-flex mb-1" style={{justifyContent: "space-between"}}>
                    <button style={{width:"49.5%"}} className="btn d-block btnStyle" onClick={()=>setPoints(points - 1)}>Subtract</button>
                    <button style={{width:"49.5%"}} className="btn d-block btnStyle" onClick={()=>setPoints(points + 1)}>Add</button>   
                </div>
                <button style={!saving ? btnStyle : btnStyle3} className="btn d-block mb-1" onClick={()=>_btnMessage(points, info.userName)}>{saving === false ? "Save" : "Saving..."}</button>
                <button className="btn d-block mb-1 btnStyle " onClick={()=> reset()}>Cancel</button>
            </>
        )
    }

    const _delete = ()=>{
        return(
            <>
                <button style={btnStyle} className="btn d-block mb-1" onClick={_deleteUser}>Yes</button>
                <button style={btnStyle} className="btn d-block mb-1" onClick={()=>setBtnChoice("default")}>No</button>
            </>
        )

    }
    if(edit){
        return(
            <EditUserForm user={info} cancel={()=>setEdit(false)}/>    
        )
    } else{
        return(
            <div className="card themeCard userCard" style={btnChoice === "destroy" ? destroyStyle : defaultStyle}>
                <div 
                    style={{height: "150px",
                        position: "relative",
                        margin: "auto",
                        width: "65%",
                        borderRadius: "50%",
                        border: "5px solid #272133",
                        marginTop: "15px",
                        boxShadow: "inset 0 0 0 4px #58cdd1",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    className="card-img-top"
                    alt="..."
                >
                    <Icon icon="emojione:star" style={{color: "#fd0531", fontSize: "7em", position: "absolute", zIndex: 0}} />
                    <p className="iconText userCardText text-center" style={{zIndex:1}}>{btnChoice === "points" ? points : initial}</p>

                    
                </div>
                <div className="card-body userCardBody">
                    <h5 className="card-title text-center" style={{color: "black"}}>
                        {btnChoice === "default" ? info.firstName : btnChoice === "points" ? points : btnChoice === "delete" ? "Are you sure want to delete this user?  This is permanent" : "Deleting..."}
                    </h5>
                    {btnChoice === "default" ? _default() : btnChoice === "points" ? _points() : btnChoice === "delete" ? _delete() : <></>}
                </div>
            </div>    
        )

    }
}
export default UserCard;