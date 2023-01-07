import Navbar from "../components/NavBar";
import Footer from "../components/Footer";


const NotFound = ()=>{
    const centerDiv = {display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "50vh"}
    return(
        <>
            <Navbar/>
            <div className="row login-register-page">
                <div className="offset-md-3 col-md-6" style={centerDiv}>
                    <div>
                       <p className="text-center notFound">404</p>
                       <p className="notFountSub">The page you are looking for does not exist!</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )

}

export default NotFound;