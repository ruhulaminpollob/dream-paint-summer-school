import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";


const Main = () => {
    return (
        <div>
            <div className="bg-black ">
                <Navbar></Navbar>

            </div>
            <Outlet></Outlet>
            <div className="bg-black">

            <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;