import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = (props) => {
    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Layout;
