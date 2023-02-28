const getProducts = () => {
    return JSON.parse(localStorage.getItem("products") || "[]");
};

const getProductById = (id) => {
    const products = JSON.parse(localStorage.getItem("products"));
    return products?.find((product) => product.id === Number(id));
};

const getProductsByCategory = (category) => {
    const products = JSON.parse(localStorage.getItem("products"));
    return products?.filter((product) => product.category === category);
};

const addProduct = (product) => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
};

const deleteProduct = (id) => {
    const products = JSON.parse(localStorage.getItem("products"));
    const updatedProducts = products.filter(
        (product) => product.id !== Number(id)
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
};

const updateProduct = (id, updates) => {
    const products = JSON.parse(localStorage.getItem("products"));
    const index = products.findIndex((product) => product.id === id);
    Object.assign(products[index], updates);
    localStorage.setItem("products", JSON.stringify(products));
};

const exp = {
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    getProductsByCategory,
};
export default exp;
