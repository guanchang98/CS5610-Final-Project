import productsModel from "./products-model.js";

export const createProduct = (product) => productsModel.create(product);
export const findProductById = (pid) => productsModel.findOne({product_id: pid});
export const findProductByObjectId = (id) => productsModel.findOne({_id: id});
export const findAllProducts = () => productsModel.find();
export const deleteProductById = (pid) => productsModel.deleteOne({_id: pid});
export const updateProductById = (pid, product) => productsModel.updateOne({_id: pid}, {$set: product});

export const checkProductExists = (product) => {
    return productsModel.count({product_id: product.product_id});
}