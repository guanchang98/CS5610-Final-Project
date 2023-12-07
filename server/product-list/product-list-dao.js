import productListModel from "./product-list-model.js";

/**
 * @dao
 * Provides data access methods for product list of users.
 *
 * @module daos/product-list-dao
 */
export const userLikesProduct = (userId, productId) => {
    return productListModel.create({userId: userId, productId: productId});
}

export const userUnlikesProduct = (userId, productId) => {
    return productListModel.deleteOne({userId: userId, productId: productId});
}

export const findAllProductListByUserId = (userId) => {
    return productListModel.find({userId: userId});
}

export const findLikeStatusByUserIdAndProductId = (userId, productId) => {
    if (productListModel.findOne({userId: userId, productId: productId})) {
        return productListModel.findOne({userId: userId, productId: productId});
    }
    return {};
}
