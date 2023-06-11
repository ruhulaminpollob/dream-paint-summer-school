import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Dream Paint-Home</title>
            </Helmet>
           <Banner></Banner>
           <PopularClass></PopularClass>
           <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default Home;