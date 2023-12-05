import React, {
    useEffect,
    useState,
    useRef
} from "react";
import BackButtonComponent from "../components/BackButtonComponent";
import {
    useSelector,
    useDispatch
} from "react-redux";
import {
    getCartByUserIdThunk
} from "../services/users/users-thunks";
import {
    findProductByIdThunk
} from "../services/products/products-thunks";
import CartAndHistoryItem from "../components/CartAndHistoryItem";
import {
    moveCartItemsToHistory,
    deleteProductFromCart
} from "../services/users/users-service";
import {
    Toast
} from "bootstrap";
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
        const response = await dispatch(findProductByIdThunk(id));
        return response;
    }

    const getCartItems = async () => {
        let cartList = [];
        if (currentUser && currentUser._id) {
            try {
                const response = await dispatch(getCartByUserIdThunk(currentUser._id));
                cartList = response.payload;
                let price = 0;
                if (cartList) {
                    const productList = [];
                    for (let i = 0; i < cartList.length; i++) {
                        const response = await getItembyId(cartList[i].product_id);
                        price += response.payload.price * cartList[i].count;
                        productList.push({...response.payload, count: cartList[i].count, cartListId: cartList[i]._id});
                    }
                    setProducts(productList);
                    setTotalPrice(price.toFixed(2));
                }
            } catch (e) {
                console.log("fetching carList error: ", e);
            }
            return [];
        }
    }

    const checkOutShoppingCart = async () => {
        for (let i = 0; i < prods.length; i++) {
            await moveCartItemsToHistory(currentUser._id, prods[i].product_id, prods[i].count);
        }
        await loadScreen();
        await toggleToast();
    }

    const deleteItemFromCart = async (item) => {
        await deleteProductFromCart(currentUser._id, item.cartListId);
        await loadScreen();
    };

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
            <hr/>
            <ul className="list-group mb-3 mt-3">
                {
                    currentUser && currentUser._id && currentUser.cart && prods &&
                    prods.map(p =>
                        <CartAndHistoryItem key={p.cartListId} item={p} onClickDelete={deleteItemFromCart}/>
                    )
                }
            </ul>
            <div className="row">
                <div className="col-8 float-start text-danger">
                    <h4>Total Price: ${totalPrice}</h4>
                </div>
                <div className="col-4">
                    <button className={`btn btn-primary float-end ${prods.length == 0 ? "disabled" : ""}`}
                            onClick={checkOutShoppingCart}>
                        Checkout
                    </button>
                </div>
            </div>
            <div className="toast text-white bg-success border-0 wd-toast" role="alert" aria-live="assertive"
                 aria-atomic="true" hidden={!showToast} ref={toastRef}>
                <div className="d-flex">
                    <div className="toast-body">
                        Checkout Successfully!
                    </div>
                    <button type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            data-bs-dismiss="toast"
                            aria-label="Close"></button>
                </div>
            </div>
        </div>
    )
}

export default CartScreen;