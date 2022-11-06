import Navbar from "../components/NavBar";
// import Footer from "../components/Footer";


const Home = ()=>{
    const centerDiv = {display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "50vh"}
    return(
        <>
            <Navbar/>
            <div className="container-fluid">
                <div className="row login-register-page">
                    <div className="offset-md-3 col-md-6" style={centerDiv}>
                        <div>
                        <p className="text-center notFound">Home Pages</p>
                        <p className="notFountSub">The page you are looking for does not exist!</p>
                        </div>
                    </div>
                </div>     
            </div>
           
            {/* <Footer/> */}
        </>
    )

}

export default Home;