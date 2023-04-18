import productListModel from "./product-list-model.js";

export const userLikesProduct = (userId, productId) => {
    return productListModel.create({userId: userId, productId: productId});
}

export const userUnlikesProduct = (userId, productId) => {
    return productListModel.deleteOne({userId: userId, productId: productId});
}

export const findAllProductList = () => {
    return productListModel.find();
}
