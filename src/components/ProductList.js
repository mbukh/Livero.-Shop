import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
    return (
        <ul className="product-list">
            {products.map((product) => (
                <li key={product.id}>
                    <div className="product-image">
                        <Link to={"/product/" + product.id}>
                            <img src={product.image} alt={product.title} />
                        </Link>
                    </div>
                    <Link to={"/product/" + product.id}>
                        <h3 className="product-title">{product.title}</h3>
                    </Link>
                    <span className="product-price">
                        {product.price}
                        <i className="currency dollar"></i>
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default ProductList;
