import axios from 'axios';
const PUNK_API = "https://api.punkapi.com/v2";
const API_BASE = process.env.REACT_APP_API_BASE;
const PRODUCT_API_URL = `${API_BASE}/products`;
// const PRODUCT_API_URL = "http://localhost:4000/api/products";

export const fullTextSearch = async (query) => {
    const response = await axios.get(`${PUNK_API}/beers?${query}`);
    return response.data;
}

export const createProduct = async (product) => {
    const response = await axios.post(PRODUCT_API_URL, product);
    return response.data;
}
export const findProducts = async () => {
    const response = await axios.get(PRODUCT_API_URL);
    const products = response.data;
    return products;
}

export const findProductById = async (pid) => {
    const response = await axios.get(`${PRODUCT_API_URL}/${pid}`);
    const product = response.data;
    return product;
}


export const deleteProductById = async (pid) => {
    const response = await axios.delete(`${PRODUCT_API_URL}/${pid}`);
    return response.data;
}
export const updateProductById = async (product) => {
    // const response = await axios.put(`${PRODUCT_API_URL}/update/${product._id}`, product);
    const response = await axios.put(`${PRODUCT_API_URL}/${product._id}`, product);
    return response.data;
}
