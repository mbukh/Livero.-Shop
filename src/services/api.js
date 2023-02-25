import localApi from "./localApi.js";
import remoteApi from "./remoteApi.js";

const getCategories = async () => {
    return await remoteApi.getCategories();
};

const getProducts = async () => {
    const remoteProduct = await remoteApi.getProducts();
    const localProduct = localApi.getProducts();
    const allProducts = combineProducts(remoteProduct, localProduct);
    return filterRemovedProducts(allProducts);
};

const getProductById = async (id) => {
    const [localProduct] = localApi.getProductById(id);
    if (localProduct?.deleted) return null;
    if (localProduct) return localProduct;
    else return await remoteApi.getProductById(id);
};

const getProductsByCategory = async (category) => {
    const remoteProduct = await remoteApi.getProductsByCategory(category);
    const localProduct = localApi.getProductsByCategory(category);
    const allProducts = combineProducts(remoteProduct, localProduct);
    return filterRemovedProducts(allProducts);
};

const addProduct = async (productData) => {
    const newProduct = await remoteApi.addProduct(productData);
    if (!newProduct?.id) return null;
    localApi.addProduct(newProduct);
    return newProduct;
};

const deleteProduct = async (id) => {
    const remoteProduct = await remoteApi.deleteProduct(id);
    const [localProduct] = localApi.getProductById(id);
    if (!remoteProduct && !localProduct) return null;
    else if (!remoteProduct) localApi.removeProduct(id);
    localApi.addProduct({ id: remoteProduct.id, deleted: true });
};

const updateProduct = async (id, updates) => {
    const remoteProduct = await remoteApi.deleteProduct(id);
    const [localProduct] = localApi.getProductById(id);
    if (!remoteProduct && !localProduct) return null;
    else if (!remoteProduct) localApi.updateProduct(id, updates);
    else localApi.addProduct({ id, ...updates });
};

export {
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    getProductsByCategory,
    getCategories,
};

// ===== //
// utils //
// ===== //
function combineProducts(remoteProducts, localProducts) {
    const filteredRemote = remoteProducts.filter(
        (remoteProduct) =>
            !localProducts.some(
                (localProduct) => remoteProduct.id === localProduct.id
            )
    );
    return [...filteredRemote, ...localProducts];
}

function filterRemovedProducts(products) {
    return products.filter((product) => !product?.deleted);
}
