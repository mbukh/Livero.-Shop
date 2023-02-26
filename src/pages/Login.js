import "../styles/form.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import userApi from "../services/userApi";

const Login = ({ setUser, setIsAdmin, user }) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");
    const usernameRef = useRef("");
    const passwordRef = useRef("");

    if (user) setTimeout(() => navigate(-1), 5000);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (usernameRef.current.value.length < 3) {
            setErrors("Username too short");
            return;
        }
        if (passwordRef.current.value.length < 3) {
            setErrors("Password too short");
            return;
        }
        const userLoggedIn = await userApi.userCanLogin(
            usernameRef.current.value,
            passwordRef.current.value
        );
        if (!userLoggedIn) {
            setErrors("Login failed check your credentials");
            return;
        }
        localStorage.setItem(
            "user",
            JSON.stringify({
                username: userLoggedIn.username,
                token: userLoggedIn.token,
                isAdmin: userLoggedIn.isAdmin,
            })
        );

        setUser({
            username: userLoggedIn.username,
            token: userLoggedIn.token,
            isAdmin: userLoggedIn.isAdmin,
        });
        setIsAdmin(userLoggedIn.isAdmin);
        navigate("/");
    };

    return !user ? (
        <form className="user-form" onSubmit={handleLogin}>
            <div className="formGroup">
                <h2 className="form-errors">{errors && errors}</h2>
            </div>
            <div className="formGroup">
                <input
                    ref={usernameRef}
                    type="text"
                    name="username"
                    placeholder="Username"
                ></input>
            </div>
            <div className="formGroup">
                <input
                    ref={passwordRef}
                    type="password"
                    name="password"
                    placeholder="Password"
                ></input>
            </div>
            <div className="formGroup">
                <button type="submit">Login</button>
            </div>
        </form>
    ) : (
        <h2>Already logged in</h2>
    );
};

export default Login;
