import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ user, isAdmin, logOutUser }) => {
    return (
        <>
            <Header user={user} isAdmin={isAdmin} logOutUser={logOutUser} />
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
