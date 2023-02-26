import localApi from "./localApi";
import remoteApi from "./remoteApi";

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
    const localProduct = localApi.getProductById(id);
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
    const newRemoteProduct = await remoteApi.addProduct(productData);
    if (!newRemoteProduct?.id) return null;
    const lastLocalId =
        localApi.getProducts().sort((a, b) => b.id - a.id)[0]?.id || 0;
    const newId = Math.max(newRemoteProduct.id, lastLocalId + 1);
    const newProduct = { ...newRemoteProduct, id: newId };
    localApi.addProduct(newProduct);
    return newProduct;
};

const deleteProduct = async (id) => {
    const remoteProduct = await remoteApi.deleteProduct(id);
    const localProduct = localApi.getProductById(id);
    if (!remoteProduct && !localProduct) return null;
    else if (!remoteProduct) localApi.removeProduct(id);
    localApi.addProduct({ id: remoteProduct.id, deleted: true });
};

const updateProduct = async (id, updates) => {
    const remoteProduct = await remoteApi.deleteProduct(id);
    const localProduct = localApi.getProductById(id);
    if (!remoteProduct && !localProduct) return null;
    else if (!remoteProduct)
        localApi.updateProduct({ id, ...localProduct, ...updates });
    else localApi.addProduct({ id, ...remoteProduct, ...updates });
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

// ===== //
// utils //
// ===== //
function combineProducts(remoteProducts = [], localProducts = []) {
    const filteredRemote = remoteProducts.filter(
        (remoteProduct) =>
            !localProducts?.some(
                (localProduct) => remoteProduct.id === localProduct.id
            )
    );
    return [...filteredRemote, ...localProducts];
}

function filterRemovedProducts(products) {
    return products.filter((product) => !product?.deleted);
}
