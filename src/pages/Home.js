import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Icon } from '@iconify/react';



const Home = ()=>{
    const centerDiv = {display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "50vh", color: "#242424"}
    // const post = async ()=>{
    //     console.log("POST")
    //     await fetch("/users1", {
    //         method: "post",
    //         headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             userName: "Killer",
    //             firstName: "J",
    //             lastName: "J",
    //             password: "sixty",
    //             familyId:"seven",
    //             accessId:"aces15224+1668040955716"
    //         })
    //     }) 
    //     .then(response => response.json())
    //     .then((data)=> {
    //         console.log(data)
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })   
    // }
    const star = "ic:twotone-star";


    return(
        <>
            <Navbar/>
            <div className="container-fluid mb-3" id="homePic">
                <div className="row login-register-page">
                    <div className=" col-sm-9 col-md-7 col-lg-6" style={centerDiv}>
                        <div style={{fontFamily: "system-ui", color: "#2c2b2b"}}>
                            <h1 id="homeHeader">Privilege Points</h1>
                            {/* <div className="d-flex"> */}
                                <div className="completeCenter mt-1"><Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/><h6 className="mb-0">A Chore List for Parents</h6></div>
                                <div className="completeCenter mt-1"><Icon icon={star} className="mr-1" style={{color: "rgb(255, 206, 49)", fontSize: "1.5rem"}}/><h6 className="mb-0">A Reward System for Kids</h6></div>    
                            {/* </div> */}
                            
                            <button type="submit" className="btn btn-block btn-primary mt-3" style={{width: "50%"}}>Check it out</button>

                            {/* <p className="text-center notFound">Home Pages</p>
                            <p onClick={post} className="notFountSub">The page you are looking for does not exist!</p> */}
                        </div>
                    </div>
                </div>     
            </div>
            <div className="container-fluid dashboard-container" style={{minHeight: 200, color: "black"}}>
                <div className="row">
                    <div className="col-12 mt-3">
                        <p className="text-center homeHeaders">What is Privilege Points?</p>
                        <p className="text-center homeSubHeaders">A Reward System for Kids</p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="offset-md-1 col-md-5 offset-lg-2 col-lg-4 ">
                        <div className="card themeCard" style={{width:"100%", padding: 25}}>
                            <p><span style={{fontWeight: 500,fontSize: "1.5em", fontStyle:"italic"}}>
                                Parents</span> add chores to the family Task List and rewards (Play Time, Treats, etc) to the Reward List. 
                                Children get Privilege Points for each task they complete.  These points can then be used to buy Rewards

                            </p>
                            {/* <p><span style={{fontWeight: 500}}>Parents</span> add chores and set point values for completing them. </p> */}
                            <div className="d-flex justify-content-center">
                                <Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/>  
                                <Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/>
                                <Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/>    
                            </div>                            
                        </div>
                    </div>
                    <div className="col-md-5 col-lg-4">
                        <div className="card themeCard" style={{width:"100%", padding: 25}}>
                            <p><span style={{fontWeight: 500, fontSize: "1.5em", fontStyle:"italic"}}>Kids</span> have more fun completing chores and practice independence.  
                                They select the chores they want to complete, choose to buy rewards or budget for better ones later on,
                                and they get their own logins! 
                            </p>
                            
                            <div className="d-flex justify-content-center">
                                <Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/> 
                                <Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/>
                                <Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/>     
                            </div>


                        
                            {/* <p>Sign up for free and use Privilege Points to make chores a game! </p> */}
                        </div>
                        {/* <div className="card themeCard" style={{width:"30%", padding: 20}}>
                            <p>These Privilege Points can then be used to get Rewards, or saved for later!</p>
                        </div> */}
                        
                        
                                                    {/* <p>Sign up for free and use Privilege Points to make chores a game! </p> */}

                    </div>
                    <div className="col-12 text-center mt-3">
                        <p><a>Sign up for free</a> and watch up to 5 children become outstandlingly productive! </p>
                    </div>
                </div>
                
            </div>
           
            <Footer/>
        </>
    )

}

export default Home;