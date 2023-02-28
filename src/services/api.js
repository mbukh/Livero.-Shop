import localApi from "./localApi";
import remoteApi from "./remoteApi";

const getCategories = async () => {
    return await remoteApi.getCategories();
};

const getProducts = async () => {
    const remoteProducts = await remoteApi.getProducts();
    const localProducts = localApi.getProducts();
    const allProducts = combineProducts(remoteProducts, localProducts);
    return filterRemovedProducts(allProducts);
};

const getProductById = async (id) => {
    const localProduct = localApi.getProductById(id);
    if (localProduct?.deleted) return null;
    if (localProduct) return localProduct;
    else return await remoteApi.getProductById(id);
};

const getProductsByCategory = async (category) => {
    const remoteProducts = await remoteApi.getProductsByCategory(category);
    const localProducts = localApi.getProductsByCategory(category);
    const allLocalProducts = localApi.getProducts();
    const allProducts = combineProducts(
        remoteProducts,
        localProducts,
        allLocalProducts
    );
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
    else if (!remoteProduct) {
        localApi.updateProduct({ id, ...localProduct, ...updates });
    } else {
        localApi.addProduct({ id, ...remoteProduct, ...updates });
    }
    return getProductById(id);
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
function combineProducts(
    remoteProducts = [],
    localProducts = [],
    allLocalProducts = []
) {
    const filteredRemote = remoteProducts.filter(
        (remoteProduct) =>
            !allLocalProducts?.some(
                (localProduct) => remoteProduct.id === localProduct.id
            )
    );
    return [...filteredRemote, ...localProducts].sort((a, b) => a.id - b.id);
}

function filterRemovedProducts(products) {
    return products.filter((product) => !product?.deleted);
}
