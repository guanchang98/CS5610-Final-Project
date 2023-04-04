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
        // <li className="list-group-item"
        //     onClick={() => navigate(`/details/${item.id}`, { state: item })}>
        //     <div className="row">
        //         <div className="col-6">
        //             Name: {item.name}<br/>
        //             Price: <i class="bi bi-currency-dollar"></i> {item.price}<br/>
        //             Description:<p className="text-secondary">{item.description}</p>
                    
        //         </div>
        //         <div className="col-6">
        //             <img className="float-end rounded" src={`/image/${item.image}`} alt='' width='50%'/>
        //         </div>

        //     </div>
        // </li>

        <div className="col-sm-4 mb-3">
            <div className="card p-2">
                <div onClick={() => navigate(`/details/${item.id}`, { state: item })}>
                    <img className="rounded" src={`/image/${item.image}`} alt='' width='100%'/>
                    <span className="text-secondary">{item.name}</span>
                    <p className="fw-bold">${item.price}</p>  
                </div>
                <div className="row justify-content-between mb-2">
                    <button type="button" className="col-5 btn btn-primary btn-sm ms-3"
                        onClick={()=>{console.log("add button")}}>
                        Add
                    </button>
                    <button type="button" className="col-5 btn btn-sm btn-primary me-3">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;