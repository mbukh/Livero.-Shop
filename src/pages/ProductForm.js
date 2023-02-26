import "../styles/form.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import Loading from "../components/Loading";

const ProductEdit = ({ user, isAdmin, setRecountProducts }) => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState();
    const [categories, setCategories] = useState();
    const [errors, setErrors] = useState("");

    const formRef = useRef("");
    const titleRef = useRef("");
    const priceRef = useRef("");
    const descriptionRef = useRef("");
    const imageRef = useRef("");
    const categoryRef = useRef("");

    useEffect(() => {
        const getCategories = async () => {
            const categories = await api.getCategories();
            setCategories(categories);
        };
        getCategories();
        if (params?.id) {
            const getProduct = async () => {
                const product = await api.getProductById(params.id);
                setProduct(product);
            };
            getProduct();
        }
        if (!params?.id) {
            setProduct(null);
            document.querySelector("form")?.reset();
            document
                .querySelector("select")
                ?.options[0].setAttribute("selected", true);
        }
    }, [params]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (titleRef.current.value.length < 2) {
            setErrors("Title is too short");
            return;
        }
        if (
            !priceRef.current.value.match(
                /^(?!0\.00)[1-9]\d{0,2}(,\d{3})*(\.\d\d)?$/g
            )
        ) {
            setErrors("Wrong price format");
            return;
        }
        if (!imageRef.current.value.match(/(https?:\/\/.*\.(?:png|jpg))/i)) {
            setErrors("Wrong image URL format: png or jpg images only");
            return;
        }
        if (!categoryRef.current.value) {
            setErrors("Choose category of products");
            return;
        }

        const uploadProduct = async () =>
            await api.addProduct({
                title: titleRef.current.value,
                price: priceRef.current.value,
                description: descriptionRef.current.value,
                image: imageRef.current.value,
                category: categoryRef.current.value,
            });

        const newProduct = await uploadProduct();
        if (newProduct) {
            setRecountProducts((prev) => prev + 1);
            setTimeout(() => navigate(`/product/${newProduct.id}`), 100);
        } else setErrors("Something went wrong during upload");
    };

    return user && isAdmin ? (
        product || !params.id ? (
            <form
                className="user-form"
                onSubmit={handleFormSubmit}
                ref={formRef}
            >
                <div className="formGroup">
                    <h2 className="form-errors">{errors && errors}</h2>
                </div>
                <div className="formGroup">
                    <input
                        ref={titleRef}
                        type="text"
                        name="title"
                        placeholder="Product name"
                        defaultValue={product ? product.title : ""}
                    ></input>
                </div>
                <div className="formGroup">
                    <input
                        ref={imageRef}
                        type="text"
                        name="image"
                        placeholder="image URL http://..."
                        defaultValue={product ? product.image : ""}
                    ></input>
                </div>
                <div className="formGroup">
                    <textarea
                        ref={descriptionRef}
                        type="text"
                        name="description"
                        placeholder="Description..."
                        defaultValue={product ? product.description : ""}
                    ></textarea>
                </div>
                <div className="formGroup">
                    <input
                        ref={priceRef}
                        type="text"
                        name="price"
                        placeholder="price in USD"
                        defaultValue={product ? product.price : ""}
                    ></input>
                </div>
                <div className="formGroup">
                    <div>Category:</div>
                    <br />
                    <select
                        ref={categoryRef}
                        name="category"
                        defaultValue={product ? product.category : ""}
                    >
                        <option>Choose category</option>
                        {categories?.map((cat) => (
                            <option value={cat} key={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <div className="formGroup">
                    <button type="submit">
                        {product?.id ? "Update product" : "Add a new product"}
                    </button>
                </div>
                <div className="formGroup">
                    <button type="reset" className="secondary">
                        reset
                    </button>
                </div>
                <br />
                <div className="formGroup">
                    <button
                        type="button"
                        className="back"
                        onClick={() => navigate(-1)}
                    >
                        back
                    </button>
                </div>
            </form>
        ) : (
            <Loading />
        )
    ) : (
        <>
            <h2>Administrators area only</h2>
        </>
    );
};

export default ProductEdit;
