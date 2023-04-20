import React, {useEffect, useState}from "react";
import { useSelector, useDispatch } from "react-redux";
import {useLocation, useParams} from "react-router";
import { useNavigate } from "react-router";
import {Link} from "react-router-dom";
import { findProductByIdThunk, updateProductByIdThunk } from "../services/products/products-thunks";
import { updateProductById } from "../services/products/products-service";


const EditProductScreen = () => {

    const { state } = useLocation();
    console.log("product: ", state)
    const [product, setProduct] = useState(state);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const saveEditButton = async () => {
        // await dispatch(updateProductByIdThunk(product));
        await updateProductById(product);
        // console.log("save edit button: ", product)
        navigate(`/details/${state._id}`, {state: product});
    }

    const cancelButton = () => {
        navigate(`/details/${product._id}`, {state: product});
    }

    const fetchProduct = async () => {
        const response = await dispatch(findProductByIdThunk(product.product_id));
        // console.log("response: ", response.payload)
        setProduct(response.payload);
    }    

    const loadScreen = async() => {
        await fetchProduct();
    }

    useEffect(() => {
        loadScreen();
    }, [])


    return (
        <div>
            <h2>Edit Product</h2>

            <div className="row mt-5">
                    <div className="col-5 text-center">
                        <img className="rounded wd-punk-image-size-detail" src={product.image_url} alt='' width='100%'/>
                    </div>
                    <div className="col-5">
                        <div className="mb-5">
                            <div className="form-floating mt-1">
                                <textarea 
                                    className="form-control" 
                                    value={product.name} 
                                    id="name"
                                    onChange={(e) => {  
                                        setProduct({
                                            ...product, 
                                            name: e.target.value,
                                        })
                                    }}>
                                </textarea>
                                <label htmlFor="name">Name</label>
                            </div>
                            <br/>
                            <div className="form-floating mt-1">
                                <textarea 
                                    className="form-control" 
                                    value={product.price} 
                                    id="price"
                                    onChange={(e) => {  
                                        setProduct({
                                            ...product, 
                                            price: e.target.value,
                                        })
                                    }}>
                                </textarea>
                                <label htmlFor="name">Price</label>
                            </div>
                            <br/>
                            <div className="form-floating mt-1">
                                <textarea 
                                    className="form-control h-50" 
                                    value={product.description} 
                                    id="description"
                                    rows = "8"
                                    onChange={(e) => {  
                                        setProduct({
                                            ...product, 
                                            description: e.target.value,
                                        })
                                    }}>
                                </textarea>
                                <label htmlFor="description">Description</label>
                            </div>
                            <br/>
                            <br/>

                            <div class="d-grid gap-2 col-6 mx-auto">
                                <button class="btn btn-primary"
                                         onClick={saveEditButton}>
                                    Save
                                </button>
                                <button class="btn btn-danger"
                                        onClick={cancelButton}>
                                    cencel
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
     
        </div>
    )
    }

    export default EditProductScreen;