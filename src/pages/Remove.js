import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import Loading from "../components/Loading";

const Remove = ({ user, isAdmin, setRecountProducts }) => {
    const navigate = useNavigate();
    const [removed, setRemoved] = useState(false);
    const params = useParams();

    useEffect(() => {
        if (!user || !isAdmin) return;
        const fetchRemove = async () => {
            await api.deleteProduct(params.id);
            setRecountProducts((prev) => prev + 1);
            setRemoved(true);
            setTimeout(() => navigate("/"), 2000);
        };
        fetchRemove();
    }, [user, isAdmin, setRemoved, params, setRecountProducts, navigate]);

    return user && isAdmin ? (
        removed ? (
            <h2>Product has been removed... Redirecting back...</h2>
        ) : (
            <Loading />
        )
    ) : (
        <>
            <h2>Administrators area only</h2>
        </>
    );
};

export default Remove;
