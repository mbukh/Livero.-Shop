import axios from "axios";

const api = axios.create({
    baseURL: "https://fakestoreapi.com",
    headers: { "Content-Type": "application/json" },
});

const getCategories = async () => {
    try {
        const response = await api.get("/products/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

const getProducts = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        return null;
    }
};

const getProductsByCategory = async (category) => {
    try {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(
            `Error fetching products in category ${category}:`,
            error
        );
        return [];
    }
};

const addProduct = async (productData) => {
    try {
        const response = await api.post("/products", productData);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        return null;
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        return null;
    }
};

const updateProduct = async (id, updates) => {
    try {
        const response = await api.put(`/products/${id}`, updates);
        return response.data;
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        return null;
    }
};

const exp = {
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    getProductsByCategory,
    getCategories,
};
export default exp;
