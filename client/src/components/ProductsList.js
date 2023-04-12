import React from "react";
import ProductItem from "./ProductItem";

const ProductsList = (props) => {
    const productArray = props.productArray;
    console.log(productArray);
    return (
        <div className="row mt-2 justify-content-between">
            {
                productArray.map(item =>
                    <ProductItem
                        key={item.id} item={item}/>)
            }
        </div>
    );
}

export default ProductsList;