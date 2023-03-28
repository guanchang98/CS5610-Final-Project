import React from "react";
import {Link} from "react-router-dom";

const ProductItem = (
    {
        item = {
            "id": "u111111",
            "name": "item1"
        }
    }
) => {
    return (
        <div>
            <Link to={`/details/${item.id}`} className="btn btn-link">{item.name}</Link>
        </div>
    );
}

export default ProductItem;