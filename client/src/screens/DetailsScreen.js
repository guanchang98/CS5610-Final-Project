import React, {
    useEffect,
    useState,
    useRef
} from "react";
import {
    useLocation
} from "react-router";
import {
    findLikeStatusByProductIdAndUserId,
    userLikesProduct,
    userUnlikesProduct
} from "../services/product-list/product-list-service";
import {
    updateProductById,
    findProductById
} from '../services/products/products-service';
import {
    addProductsToUserCart
} from '../services/users/users-service';
import {
    useDispatch,
    useSelector
} from "react-redux";
import BackButtonComponent from "../components/BackButtonComponent";
import {
    useNavigate
} from "react-router";
import {
    findUserByIdThunk
} from "../services/users/users-thunks";
import {
    Toast
} from "bootstrap";

/**
 * Functional component representing detail page of a product.
 * Seller can edit product's detail, while buyer can add to cart/like the product.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
const DetailsScreen = () => {
    const {state} = useLocation();
    const [seller, setSeller] = useState(null);
    const [product, setProduct] = useState(state);
    const [count, setCount] = useState(1);
    const [showToast, setShowToast] = useState(false); 
    const toastRef = useRef(null);
    const currentUser = useSelector(state => state.users.currentUser);
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);

    const toggleToast = () => {
        setShowToast(!showToast);
    };

    const getLikeStatus = async () => {
        if (currentUser && currentUser._id) {
            const response = await findLikeStatusByProductIdAndUserId(currentUser._id, state._id);
            if (response === null) {
                await setLiked(false);
            } else {
                await setLiked(true);
            }
        }
    }

    const navigate = useNavigate();

    const likeProduct = async () => {
        if (liked) {
            await userUnlikesProduct(currentUser._id, state._id);
        } else {
            await userLikesProduct(currentUser._id, state._id);
        }
        await setLiked(!liked);
    }

    const addToCart = async () => {
        const response = await addProductsToUserCart(currentUser._id, state.product_id, count);
        await toggleToast();

    }

    const addToWishlist = async () => {
        await updateProductById({...state, seller_id: currentUser._id});
        await userLikesProduct(currentUser._id, state._id);
        await fetchProduct();
    }

    const findSellerById = async () => {
        if (product.seller_id) {
            const response = await dispatch(findUserByIdThunk(product.seller_id));
            console.log("response: ", response)
            setSeller(response.payload);
        }
    }

    const editButton = () => {
        console.log("edit button: ", product)
        navigate(`/edit-product`, {state: product});
    }

    const fetchProduct = async () => {
        const response = await findProductById(state.product_id);
        setProduct(response);
    }

    const loadScreen = async () => {
        await fetchProduct();
        await getLikeStatus();
        await findSellerById();
    };

    useEffect(() => {
        //fetch product information, check whether current user like/sell/like the product
        loadScreen()
        if (showToast) {
            const toast = new Toast(toastRef.current);
            toast.show();
            setTimeout(() => {
                setShowToast(false);
            }, 2000); // Change state after 2 seconds
        }
    }, [showToast, currentUser]);

    return (
        <div>
            {/* <BackButtonComponent/> */}
            {/* Detail page for item {params.detailsId}; */}
            <BackButtonComponent/>
            <h2>Product Detail</h2>
            {
                seller &&
                <div>
                    <span className="text-secondary">Sell by </span>
                    <img className="rounded"
                         src={seller.avatar}
                         alt=''
                         width="50px"
                         height='50px'
                         onClick={() => navigate(`/profile/${seller._id}`)}/>
                </div>
            }

            <div className="row mt-5">
                <div className="col-5 text-center">
                    <img className="rounded wd-punk-image-size-detail" src={state.image_url} alt='' width='100%'/>
                </div>
                <div className="col-5">
                    <div className="mb-5">
                        <h3 className="fw-bold text-secondary">{state.name}</h3>
                        <div className="mt-1">
                            <ul className="list-unstyled">
                                <li><h3 className="fw-bold">${Number(state.price).toFixed(2)}
                                    {
                                        currentUser && currentUser._id && currentUser.role === "BUYER" &&
                                        <i className={`${liked ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'} float-end me-2`}
                                           onClick={likeProduct}></i>
                                    }
                                </h3></li>
                            </ul>
                        </div>
                        <p className="text-secondary">{state.description}</p>
                    </div>
                    {
                        currentUser === null &&
                        <div className="d-grid gap-2 col-5 mx-auto">
                            <button className="btn btn-primary" onClick={() => navigate('/login')}>Please Login</button>
                        </div>

                    }

                    {/* buyer role to add products to cart */}
                    {
                        (currentUser !== null && currentUser.role === "BUYER") &&
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
            <div className="toast text-white bg-success border-0 wd-toast" role="alert" aria-live="assertive"
                 aria-atomic="true" hidden={!showToast} ref={toastRef}>
                <div className="d-flex">
                    <div className="toast-body">
                        Add to Cart Successfully!
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close"></button>
                </div>
            </div>
        </div>
    )
}

export default DetailsScreen;