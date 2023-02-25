import "normalize.css";
import "reset-css";
import "./App.css";
import { Error404, Home, Layout, Login, Category } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

const App = () => {
    const [isUser, setUser] = useState(false);
    const [isAdmin, setAdmin] = useState(false);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path={`/login`} element={<Login />} />
                        <Route
                            path={`/category/:catName`}
                            element={<Category />}
                        />
                        <Route path="*" element={<Error404 />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
