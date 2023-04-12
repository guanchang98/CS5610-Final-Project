import React from "react";
import BackButtonComponent from "../components/BackButtonComponent";
import ProductsList from "../components/ProductsList";
const CartScreen = () => {
    return (
        <div>
            <BackButtonComponent/>
            <h1>Cart</h1>
            <ProductsList/>
        </div>
    )
}

export default CartScreen;