import React, { useEffect } from "react";
import BackButtonComponent from "../components/BackButtonComponent";
import {useSelector, useDispatch} from "react-redux";
// import ProductItem from "../components/ProductItem";
import {findUserByIdThunk, profileThunk, getCartByUserIdThunk} from "../services/users/users-thunks";
// import {findUserById} from "../services/users/users-service";
import {useState} from "react";
// import {findProductById} from "../services/products/products-service";
import{findProductByIdThunk} from "../services/products/products-thunks";
import ItemInCart from "../components/itemInCart";


const CartScreen = () => {
    const {currentUser} = useSelector(state => state.users); 
    let dispatch = useDispatch();
    const [prods, setProducts] = useState([]);

    const getItembyId = async (id) => {
        console.log("wait to get item by id")
        const response = await dispatch(findProductByIdThunk(id));
        console.log("item from getItemById function: ", response.payload);
        return response;
    }

    const getCartItems = async () => {
  
        var cartList = [];
        if (currentUser._id){
            try{
                const response = await dispatch(getCartByUserIdThunk(currentUser._id));
                cartList = response.payload;
                if (cartList) {
                    console.log("cart length: ", cartList.length);
                    const productList = [];
                    for (let i = 0; i < cartList.length; i++) {
                        const response = await getItembyId(cartList[i].product_id);
                        // console.log(response);
                        // console.log(response.payload);
                        // console.log("productList: ", response.payload);
                        productList.push({...response.payload, count: cartList[i].count});
                    };
                    // console.log("productList: ", productList.length)
                    setProducts(productList);       
                }
            } catch (e) {
                console.log("fetching carList error: ", e);
            }
            return [];
        }
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
            <ul className="list-group">
                <li className=" list-group-item">
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
                        <ItemInCart key={Date()} item={p}/>
                        )
                 }
            </ul>
            
        </div>
    )
}

export default CartScreen;