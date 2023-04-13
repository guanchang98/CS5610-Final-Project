import React from "react";
// import {Link} from "react-router-dom";
import { useNavigate } from 'react-router';

const ProductItem = (
    {
        item = {
            "id": "p111111",
            "name": "item", 
            "price": 10.00,
            "description": "While Bootstrap uses ems or rems for defining most sizes, pxs are used for grid breakpoints and container width.",
        }
    }
) => {
    let navigate = useNavigate(); 
    return (
        <div className="col-sm-3 mb-3">
            <div className="card p-2">
                <div onClick={() => navigate(`/details/${item.id}`, { state: item })}>
                    <img className="rounded" src={`/image/${item.image}`} alt='' width='100%'/>
                    <span className="text-secondary">{item.name}</span>
                    <p className="fw-bold">${item.price}</p>  
                </div>
                <div className="row mb-2 justify-content-between">
                    <div className="col-6 text-center">
                        <button type="button" className="btn btn-primary w-65"
                            onClick={()=>{console.log("add button")}}>
                            Add
                        </button>
                    </div>
                    <div className="col-6 text-center">
                        <button type="button" className="btn btn-primary w-65">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;