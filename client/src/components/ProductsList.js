import React from "react";
import ProductItem from "./ProductItem";
import {useSelector} from "react-redux";

const ProductsList = (props) => {
    const productArray = props.productArray;
    const {loading} = useSelector(state => state.products);
    return (
        <div className="row mt-2">
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