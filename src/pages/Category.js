import "../styles/products.css";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";

const Category = ({ recountProducts }) => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const fetchProducts = async () => {
            const products = params?.category
                ? await api.getProductsByCategory(params.category)
                : await api.getProducts();
            setProducts(products);
            setIsLoading(false);
        };
        const fetchCategories = async () => {
            const categories = await api.getCategories();
            setCategories(categories);
        };
        fetchProducts();
        fetchCategories();
        return () => setIsLoading(true);
    }, [recountProducts, params.category]);

    return (
        <>
            <ul className="categories">
                {categories.map((category) => (
                    <li key={category}>
                        <NavLink
                            to={"/category/" + category}
                            className={({ isActive }) =>
                                isActive ? "active" : undefined
                            }
                        >
                            {category}
                        </NavLink>
                    </li>
                ))}
            </ul>

            {products && !isLoading ? (
                <ProductList products={products} />
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Category;
