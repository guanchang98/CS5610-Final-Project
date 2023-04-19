import React, {useEffect, useState, useRef} from "react";
import BackButtonComponent from "../components/BackButtonComponent";
import {useSelector, useDispatch} from "react-redux";
// import ProductItem from "../components/ProductItem";
import {findUserByIdThunk, profileThunk, getCartByUserIdThunk} from "../services/users/users-thunks";
// import {findUserById} from "../services/users/users-service";
// import {findProductById} from "../services/products/products-service";
import {findProductByIdThunk} from "../services/products/products-thunks";
import CartAndHistoryItem from "../components/CartAndHistoryItem";
import {moveCartItemsToHistory} from "../services/users/users-service";
import {Toast} from "bootstrap";
import "../index.css";

const CartScreen = () => {
    const {currentUser} = useSelector(state => state.users);
    let dispatch = useDispatch();
    const [prods, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const toastRef = useRef(null);

    const toggleToast = () => {
        setShowToast(!showToast);
    };

    useEffect(() => {
        if (showToast) {
            const toast = new Toast(toastRef.current);
            toast.show();
            setTimeout(() => {
                setShowToast(false);
            }, 2000); // Change state after 2 seconds
        }
    }, [showToast]);

    const getItembyId = async (id) => {
        // console.log("wait to get item by id")
        const response = await dispatch(findProductByIdThunk(id));
        // console.log("item from getItemById function: ", response.payload);
        return response;
    }

    const getCartItems = async () => {
        let cartList = [];
        if (currentUser._id) {
            try {
                const response = await dispatch(getCartByUserIdThunk(currentUser._id));
                cartList = response.payload;
                let price = 0;
                if (cartList) {
                    // console.log("cart length: ", cartList.length);
                    const productList = [];
                    for (let i = 0; i < cartList.length; i++) {
                        const response = await getItembyId(cartList[i].product_id);
                        price += response.payload.price * cartList[i].count;
                        // console.log(response);
                        // console.log(response.payload);
                        // console.log("productList: ", response.payload);
                        productList.push({...response.payload, count: cartList[i].count});
                    }
                    // console.log("productList: ", productList.length)
                    setProducts(productList);
                    setTotalPrice(price);
                    // console.log(productList);
                }
            } catch (e) {
                console.log("fetching carList error: ", e);
            }
            return [];
        }
    }

    const checkOutShoppingCart = async () => {
        for (let i = 0; i < prods.length; i++) {
            // console.log("checkOutShoppingCart", currentUser._id, prods[i].product_id, prods[i].count);
            await moveCartItemsToHistory(currentUser._id, prods[i].product_id, prods[i].count);
        }
        await loadScreen();
        await toggleToast();
    }
    const loadScreen = async () => {
        await getCartItems();
    };

    useEffect(() => {
        loadScreen();
    }, [currentUser]);


    return (
        <div>
            <BackButtonComponent/>
            <h1>Cart</h1>
            <ul className="list-group mb-3">
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-8">
                            <h3>Name</h3>
                        </div>
                        <div className="col-2">
                            <h3>Price</h3>
                        </div>
                        <div className="col-2">
                            <h3>Quantity</h3>
                        </div>
                    </div>
                </li>
                {
                    currentUser && currentUser._id && currentUser.cart && prods &&
                    prods.map(p =>
                        // console.log("p: ", p),
                        <CartAndHistoryItem item={p}/>
                    )
                }
            </ul>
            <div className="float-start text-danger">
                <b>Total Price: ${totalPrice}</b>
            </div>
            <button className="btn btn-primary float-end" onClick={checkOutShoppingCart}>
                Checkout
            </button>
            <div className="toast text-white bg-success border-0 wd-toast" role="alert" aria-live="assertive"
                 aria-atomic="true" hidden={!showToast} ref={toastRef}>
                <div className="d-flex">
                    <div className="toast-body">
                        Checkout Successfully!
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close"></button>
                </div>
            </div>
        </div>
    )
}

export default CartScreen;