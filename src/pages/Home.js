import Navbar from "../components/NavBar";
// import Footer from "../components/Footer";


const Home = ()=>{
    const centerDiv = {display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "50vh"}
    const post = async ()=>{
        console.log("POST")
        await fetch("/users1", {
            method: "post",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: "Killer",
                firstName: "J",
                lastName: "J",
                password: "sixty",
                familyId:"seven",
                accessId:"aces15224+1668040955716"
            })
        }) 
        .then(response => response.json())
        .then((data)=> {
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })   
    }
    


    return(
        <>
            <Navbar/>
            <div className="container-fluid">
                <div className="row login-register-page">
                    <div className="offset-md-3 col-md-6" style={centerDiv}>
                        <div>
                        <p className="text-center notFound">Home Pages</p>
                        <p onClick={post} className="notFountSub">The page you are looking for does not exist!</p>
                        </div>
                    </div>
                </div>     
            </div>
           
            {/* <Footer/> */}
        </>
    )

}

export default Home;