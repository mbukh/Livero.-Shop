import "../styles/product.css";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";

const Product = ({ user, isAdmin }) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState();
    const params = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await api.getProductById(params.id);
            console.log(product);
            if (!product) {
                navigate("/error404");
                return;
            }
            setProduct(product);
        };
        fetchProduct();
    }, [navigate, params.id]);

    return product ? (
        <div className="product-full">
            <div className="product-image">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
                <h1>{product.title}</h1>
                <div className="data">
                    {product.rating && (
                        <div className="rating">
                            <h3>Rating</h3>
                            {product.rating.rate} / 5 ({product.rating.count})
                        </div>
                    )}
                    <div className="description">
                        <h3>Description</h3>
                        <p>{product.description}</p>
                    </div>
                </div>
                <div className="price">
                    {product.price}
                    <i className="currency dollar"></i>
                </div>
                <div className="category">
                    Category:{" "}
                    <span className="category-name">{product.category}</span>
                </div>
                {user?.token && isAdmin && (
                    <div className="admin">
                        <Link
                            className="edit"
                            to={`/product/${product.id}/edit`}
                        >
                            Edit product
                        </Link>
                        <Link
                            className="remove"
                            to={`/product/${product.id}/remove`}
                        >
                            Remove
                        </Link>
                    </div>
                )}
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default Product;
