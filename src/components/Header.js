import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function Header({ user, isAdmin, logOutUser }) {
    return (
        <header>
            <nav>
                <Logo />
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "active" : undefined
                            }
                        >
                            All products
                        </NavLink>
                    </li>
                    {user && isAdmin && (
                        <>
                            <li>
                                <NavLink
                                    to="/product/add"
                                    className={({ isActive }) =>
                                        isActive ? "active" : undefined
                                    }
                                >
                                    <i className="icon add"></i>Add product
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/logout" onClick={logOutUser}>
                                    Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                    {!user && (
                        <li>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? "active" : undefined
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
