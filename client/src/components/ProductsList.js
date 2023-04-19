import React from "react";
import ProductItem from "./ProductItem";
import {useSelector} from "react-redux";

const ProductsList = (props) => {
    const productArray = props.productArray;
    const {loading} = useSelector(state => state.products);
    // console.log("loading", loading);
    return (
        <div className="row mt-2 justify-content-between">
            {
                loading &&
                <li className="list-group-item">
                    Loading...
                </li>
            }
            {
                productArray.map(item =>
                    <ProductItem
                        key={item._id} item={item}/>
                        )
            }
        </div>
    );
}

export default ProductsList;