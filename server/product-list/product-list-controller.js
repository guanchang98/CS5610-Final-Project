import * as productDao from './product-list-dao.js';


function ProductListController(app) {

    const findProductList = async (req, res) => {
        const productList = await productDao.findAllProductList();
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

    app.post("/api/users/:uId/likes/:pId", userLikesProduct);
    app.delete("/api/users/:uId/unlikes/:pId", userUnlikesProduct);
    app.get("/api/product-list", findProductList);
}

export default ProductListController;