import * as productDao from './product-list-dao.js';

/**
 * @controller
 * Handles incoming HTTP requests related to product list of buyer(like)/seller(own).
 *
 * @module controllers/ProductListController
 */
function ProductListController(app) {

    const findProductListByUserId = async (req, res) => {
        const userId = req.params.id;
        const productList = await productDao.findAllProductListByUserId(userId);
        res.json(productList);
    }

    const userLikesProduct = async (req, res) => {
        const userId = req.params.uId;
        const productId = req.params.pId;
        const like = await productDao.userLikesProduct(userId, productId);
        res.json(like);
    };

    const userUnlikesProduct = async (req, res) => {
        const userId = req.params.uId;  
        const productId = req.params.pId;
        const status = await productDao.userUnlikesProduct(userId, productId);
        res.json(status);
    };

    const findLikeStatus = async (req, res) => {
        const userId = req.params.uid;
        const productId = req.params.pid;
        const status = await productDao.findLikeStatusByUserIdAndProductId(userId, productId);
        res.json(status);
    }

    app.post("/api/product-list/:uId/likes/:pId", userLikesProduct);
    app.delete("/api/product-list/:uId/unlikes/:pId", userUnlikesProduct);
    app.get("/api/product-list/:id", findProductListByUserId);
    app.get("/api/product-list/:uid/:pid/likeStatus", findLikeStatus);
}

export default ProductListController;