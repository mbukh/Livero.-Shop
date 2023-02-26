import "normalize.css";
import "reset-css";
import "./styles/App.css";
import {
    Error404,
    Layout,
    Login,
    Category,
    Product,
    ProductForm,
    Remove,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Design
// https://www.behance.net/gallery/92212755/Livero-Minimalistic-design-for-online-furniture-store?tracking_source=search_projects%7Cminimalistic+online+shop

const App = () => {
    const [user, setUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [recountProducts, setRecountProducts] = useState(0);

    const handleLogOutUser = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        setIsAdmin(false);
        setUser(false);
    };

    useEffect(() => {
        if (user) return;
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData) return;
        setUser({
            username: userData.username,
            token: userData.token,
            isAdmin: userData.isAdmin,
        });
        if (userData.isAdmin) setIsAdmin(true);
    }, [user]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout
                                user={user}
                                isAdmin={isAdmin}
                                logOutUser={handleLogOutUser}
                            />
                        }
                    >
                        <Route
                            index
                            element={
                                <Category recountProducts={recountProducts} />
                            }
                        />
                        <Route
                            path={`/login`}
                            element={
                                <Login
                                    setUser={setUser}
                                    user={user}
                                    setIsAdmin={setIsAdmin}
                                />
                            }
                        />
                        <Route
                            path={`/category/:category`}
                            element={
                                <Category recountProducts={recountProducts} />
                            }
                        />
                        <Route
                            path={`/product/add`}
                            element={
                                <ProductForm
                                    user={user}
                                    isAdmin={isAdmin}
                                    setRecountProducts={setRecountProducts}
                                />
                            }
                        />
                        <Route
                            path={`/product/:id`}
                            element={<Product user={user} isAdmin={isAdmin} />}
                        />
                        <Route
                            path={`/product/:id/remove`}
                            element={
                                <Remove
                                    user={user}
                                    isAdmin={isAdmin}
                                    setRecountProducts={setRecountProducts}
                                />
                            }
                        />
                        <Route
                            path={`/product/:id/edit`}
                            element={
                                <ProductForm
                                    user={user}
                                    isAdmin={isAdmin}
                                    setRecountProducts={setRecountProducts}
                                />
                            }
                        />
                        <Route path="*" element={<Error404 />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
