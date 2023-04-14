import * as productsDao from "./products-dao.js";

function ProductsController(app) {
    const createProduct = async (req, res) => {
        const newProduct = req.body;
        const exist = await productsDao.checkProductExists(newProduct);
        // console.log(exist);
        let product = null;
        if (exist === 0) {
            product = await productsDao.createProduct(newProduct);
        } else {
            product = await productsDao.findProductById(newProduct.product_id);
        }
        res.json(product);
    }

    const findProducts = async (req, res) => {
        const products = await productsDao.findAllProducts();
        res.json(products);
    }

    const updateProductById = async (req, res) => {
        const productIdToUpdate = req.params.pid;
        const updates = req.body;
        const status = await productsDao.updateProductById(productIdToUpdate, updates);
        res.json(status);
    }

    const findProductById = async (req, res) => {
        const productId = req.params.pid;
        const product = await productsDao.findProductById(productId);
        res.json(product);
    }

    const deleteProductById = async (req, res) => {
        const productId = req.params.pid;
        const status = await productsDao.deleteProductById(productId);
        res.json(status);
    }

    app.post("/api/products", createProduct);
    app.get("/api/products", findProducts);
    app.get("/api/products/:pid", findProductById);
    app.put("/api/products/:pid", updateProductById);
    app.delete("/api/products/:pid", deleteProductById);
}


export default ProductsController;