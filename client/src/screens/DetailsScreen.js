import React, { useEffect, useState } from "react";
import {useLocation, useParams} from "react-router";
import { userLikesProduct} from "../services/product-list/product-list-service";
// import { updateProductByIdThunk} from "../services/products/products-thunks";
import {updateProductById, findProductById} from '../services/products/products-service';
import { updateProductByIdThunk, findProductByIdThunk } from "../services/products/products-thunks";
import {addProductsToUserCart} from '../services/users/users-service';
import { useDispatch, useSelector } from "react-redux";
import { addProductsToUserCartThunk } from "../services/users/users-thunks";
import { userLikesProductThunk } from "../services/product-list/product-list-thunk";
import BackButtonComponent from "../components/BackButtonComponent";
// import BackButtonComponent from "../components/BackButtonComponent";
import { useNavigate } from "react-router";

const DetailsScreen = () => {
    // const params = useParams();
    const { state } = useLocation();
    const [product, setProduct] = useState(state);
    // console.log("state", state)
    // console.log("product: ", product)
    const [count, setCount] = useState(1);
    const [liked, setLiked] = useState(false);
    const {currentUser} = useSelector(state => state.users);

    // console.log("current user: ", currentUser)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const likeProduct = async () => {
        setLiked(!liked);
        const response = await userLikesProduct(currentUser._id, state._id);
    }

    const addToCart = async () => {
        console.log("count: ", count)
        const response = await addProductsToUserCart(currentUser._id, state.product_id, count);
        console.log("response from add to cart: ", response)
        // const response = await addProductsToUserCartThunk(currentUser._id, state.product_id, count);

    }

    const addToWishlist = async () => {
        const response = await updateProductById({...state, seller_id: currentUser._id});
        const response2 = await userLikesProduct(currentUser._id, state._id);
        fetchProduct();
        // const response = await dispatch(updateProductByIdThunk({...state, seller_id: currentUser._id}));
    }

    const editButton = () => {
        console.log("edit button: ", product)
        navigate(`/edit-product`, {state: product});
    }

    const fetchProduct = async () => {
        const response = await findProductById(state.product_id);
        setProduct(response);
    }

    useEffect(() => {
        fetchProduct();
    }, [])
    
    return (
        <div> 
            {/* <BackButtonComponent/> */}
            {/* Detail page for item {params.detailsId}; */}
            <BackButtonComponent/>
            <h2>Product Detail</h2>
           
                <div className="row mt-5">
                    <div className="col-5 text-center">
                        <img className="rounded wd-punk-image-size-detail" src={state.image_url} alt='' width='100%'/>
                    </div>
                    <div className="col-5">
                        <div className="mb-5">
                            <h3 className="fw-bold text-secondary">{state.name}</h3>
                            <div className="mt-1">
                                <ul className="list-unstyled">
                                    <li><h3 className="fw-bold">${state.price}
                                        {
                                            currentUser !== null && currentUser.role === "BUYER" &&
                                            <i className={`${liked? 'bi bi-heart-fill text-danger': 'bi bi-heart'} float-end me-2`}
                                            onClick={likeProduct}></i>
                                        }
                                    </h3></li>
                                </ul>
                            </div>
                            <p className="text-secondary">{state.description}</p>
                        </div>
                        {
                            currentUser === null && 
                            <div>
                                <h3>Log in</h3>
                            </div>
                                
                        }

                        {/* buyer role to add products to cart */}
                        {
                            ( currentUser !== null && currentUser.role === "BUYER") &&
                            <div className="row mt-5">
                                <div className="col-6">
                                    <select
                                            className="form-select"
                                            value={count}
                                            onChange={(e) => {
                                            setCount(e.target.value);
                                            }}>
                                        <option defaultValue>Select Quaility</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                                <div className="col-5">
                                    <button className="btn btn-primary float-end"
                                            onClick={addToCart}>
                                            Add To Cart
                                    </button>
                                </div>
                                <br/>
                                <br/>
                            </div>
                        }
                        
                        {/* seller role to add product to wishlist */}
                        {
                            currentUser !== null && currentUser.role === "SELLER" && product.seller_id === undefined &&
                            <div className="text-center">
                                <button className="btn btn-primary"
                                        onClick={addToWishlist}>
                                    Add To Wishlist
                                </button>
                            </div>
                        }
                    </div>
                </div>

                {   
                    currentUser !== null && currentUser._id === product.seller_id && 
                    <div className="d-grid gap-2 col-2 mx-auto mt-5">
                        <button className="btn btn-danger" 
                                onClick={editButton}>
                            Edit
                        </button>
                    </div>
                }
                <br/>
                <br/>
        </div>
    )
}

export default DetailsScreen;   