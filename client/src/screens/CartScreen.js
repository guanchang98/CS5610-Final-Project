import React, {useEffect} from "react";
import BackButtonComponent from "../components/BackButtonComponent";
import {useSelector, useDispatch} from "react-redux";
// import ProductItem from "../components/ProductItem";
import {findUserByIdThunk, profileThunk, getCartByUserIdThunk} from "../services/users/users-thunks";
// import {findUserById} from "../services/users/users-service";
import {useState} from "react";
// import {findProductById} from "../services/products/products-service";
import {findProductByIdThunk} from "../services/products/products-thunks";
import ItemInCart from "../components/itemInCart";
import {moveCartItemsToHistory} from "../services/users/users-service";


const CartScreen = () => {
    const {currentUser} = useSelector(state => state.users);
    let dispatch = useDispatch();
    const [prods, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

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
                    ;
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
            console.log("checkOutShoppingCart", currentUser._id, prods[i].product_id, prods[i].count);
            await moveCartItemsToHistory(currentUser._id, prods[i].product_id, prods[i].count);
        }
    }
        const loadScreen = async () => {
            await getCartItems();
        };

        useEffect(() => {
            loadScreen();
        }, [currentUser, prods]);


        return (
            <div>
                <BackButtonComponent/>
                <h1>Cart</h1>
                <ul className="list-group mb-3">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-9">
                                <h3>Name</h3>
                            </div>
                            <div className="col-3">
                                <h3>Quaility</h3>
                            </div>
                        </div>
                    </li>
                    {
                        currentUser._id && currentUser.cart && prods &&
                        prods.map(p =>
                            // console.log("p: ", p),
                            <ItemInCart item={p}/>
                        )
                    }
                </ul>
                <div className="float-start text-danger">
                    <b>Total Price: ${totalPrice}</b>
                </div>
                <button className="btn btn-primary float-end" onClick={checkOutShoppingCart}>
                    Checkout
                </button>

            </div>
        )
    }

    export default CartScreen;