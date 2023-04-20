import React from "react";
import { useNavigate } from 'react-router';
import "../index.css";

const ProductItem = (
    {
        item = {
            "id": "p111111",
            "name": "item", 
            "price": 10.00,
            "image_url": "https://images.punkapi.com/v2/192.png",
            "description": "While Bootstrap uses ems or rems for defining most sizes, pxs are used for grid breakpoints and container width.",
        }
    }
) => {
    let navigate = useNavigate(); 
    // console.log("product item: ", item);
    return (
        <div className="col-md-4 col-lg-3 col-sm-6 mb-3">
            <div className="card p-2" onClick={() => navigate(`/details/${item._id}`, { state: item })}>
                <div className="text-center">
                    <img className="rounded wd-punk-image-size-home" src={item.image_url} alt='' length='100%'/><br/><br/>  
                </div>
                <div>
                    <p className="text-center text-secondary">{item.name}</p>
                    <p className="text-center fw-bold">${item.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
