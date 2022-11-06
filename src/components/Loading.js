const Loading = ({message, search})=>{
    //Search is t/f value passed down from parent and used to...
    //Set Top Position based on whether the current page is the search page or not
    const topVal = search ? "43%" : "50%";
    const spinHolder = {position: "absolute", top: topVal, left: "50%", right: "50%", display: "inline-block", marginRight: "-50%", transform: "translate(-50%, -50%)"}
    return(
        <div className="text-center" style={spinHolder}>
            <div className="spinner-border" role="status" style={{height: "3rem", width: "3rem"}}>
                <span className="sr-only">Loading...</span>
            </div>
            <h4 style={{marginTop: "15px"}} id="loading-message">{message}</h4>
        </div>
    )
        
}

export default Loading;