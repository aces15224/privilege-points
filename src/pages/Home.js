import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Icon } from '@iconify/react';
import taskList from "../taskList.png";
import rewardList from "../rewards.png";




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
            <div className="container-fluid mb-3" id="homePic" style={{borderTop: "15px solid #7878f9"}}>
                <div className="row">
                    <div className=" col-sm-9 col-md-7 col-lg-6" style={centerDiv}>
                        <div style={{fontFamily: "system-ui", color: "#2c2b2b"}}>
                            <h1 id="homeHeader">Privilege Points</h1>
                            {/* <div className="d-flex"> */}
                                <div className="completeCenter mt-1"><Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/><h6 className="mb-0">A Chore List for Parents</h6></div>
                                <div className="completeCenter mt-1"><Icon icon={star} className="mr-1" style={{color: "rgb(255, 206, 49)", fontSize: "1.5rem"}}/><h6 className="mb-0">A Reward System for Kids</h6></div>    
                            {/* </div> */}
                            
                            <a className="btn btn-block btn-primary mt-3 btnShadow" style={{width: "50%", color: "white"}} href="/sign-up">Check it out</a>
                        </div>
                    </div>
                </div>     
            </div>
            <div className="container-fluid dashboard-container" style={{minHeight: 200, color: "black"}}>
                <div className="row">
                    <div className="col-12 mt-5 mb-1">
                        <p className="text-center homeHeaders">What is Privilege Points?</p>
                        <p className="text-center homeSubHeaders">A Reward System for Kids</p>
                    </div>
                </div>
                <div className="row">
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
                       
                    </div>
                    <div className="col-12 text-center 5 pb-3">
                        <p  className="mt-2" style={{fontWeight: 300, fontSize: "1.1em"}}><a>Sign up for free</a> and watch up to 5 children become outstandlingly productive! </p>
                    </div>
                </div>
                
            </div>
            <div className="container-fluid dashboard-container" style={{color: "black", backgroundColor:"white", borderBottom:"15px solid #7878f9"}}>
                <div className="row">
                    <div className="col-12 mt-5 mb-1">
                        <p className="text-center homeHeaders" style={{fontFamily: "system-ui", color: "rgb(44, 43, 43)"}}>Try the Privilege Points App!</p>
                        <p className="text-center homeSubHeaders" style={{fontSize: "1.5em"}}>It's easy to use</p>
                    </div>
                </div>
                <div className="row pt-2 pb-4" style={centerDiv}>
                    <div className="col-12 col-md-6 ">
                        <img src={taskList} style={{height: "auto", width: "100%"}}/>
                        <p className="text-center mt-2" style={{fontWeight: 300, fontSize: "1.1em"}}>Parents can add, edit, and delete anything</p>
                    </div>   
                    <div className="col-12 col-md-6">
                        <img src={rewardList} style={{height: "auto", width: "100%"}}/> 
                        <p className="text-center mt-2" style={{fontWeight: 300, fontSize: "1.1em"}}>Kids can complete tasks and buy rewards</p>
                    </div>
                    
                    {/* <div className="col-12 col-md-5">
                        <h1 className="text-left">It's easy to get started!</h1>
                        <ul>
                            <li className="completeCenter mt-1">
                                <Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/>
                                <h6 className="mb-0">Sign Up for a Free Account</h6>
                            </li>
                            <li className="completeCenter mt-1">
                                <Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/>
                                <h6 className="mb-0">Create Tasks and Rewards</h6>
                            </li>
                            <li className="completeCenter mt-1">
                                <Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/>
                                <h6 className="mb-0">Add up to 5 family members. That's all!</h6>
                            </li>
                            <li className="completeCenter mt-1">
                                <button  className="btn btn-block btn-danger mt-3" style={{width: "50%"}}>Try Now</button>
                            </li>
                        </ul>

                    </div> */}
                </div>
                <div className="row pb-4" style={centerDiv}>
                    <div className="col-12" style={{minHeight: 250}}>
                        <p className="homeHeaders" style={{fontFamily: "system-ui", color: "rgb(44, 43, 43)"}}>
                            It's easy to get started!
                        </p>
                        {/* <p className="text-center homeSubHeaders m-1" style={{fontSize: "1em"}}>Start Making Chores Fun Today</p> */}

                        <ul style={{display: "inline-block", padding: 0}}>
                            <li className="completeCenter mt-1">
                                <Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/>
                                <h6 className="mb-0">Sign Up for a Free Account</h6>
                            </li>
                            <li className="completeCenter mt-1">
                                <Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/>
                                <h6 className="mb-0">Create Tasks and Rewards</h6>
                            </li>
                            <li className="completeCenter mt-1">
                                <Icon icon={star} className="mr-1" style={{color:"rgb(255, 206, 49)", fontSize: "1.5rem"}}/>
                                <h6 className="mb-0">Add up to 5 family members</h6>
                            </li>
                            <li className="completeCenter mt-1">
                                <a className="btn btn-block btn-danger mt-3 btnShadow" style={{color: "white"}} href="/sign-up">Join Now</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-5 d-flex">
                        {/* <img src={rewardList} style={{height: "auto", maxWidth: "520px"}}/> */}
                    </div>
                </div>
            </div>

           
            <Footer/>
        </>
    )

}

export default Home;