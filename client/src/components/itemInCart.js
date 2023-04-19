import React from "react";
import { useNavigate } from 'react-router';

const ItemInCart = ({item}) => {
    let navigate = useNavigate(); 
    // console.log("product item: ", item);

    return (
        
            <li className="list-group-item">
                <div className="row">
                    <div className="col-9">
                        <h4>{item.name}</h4>
                    </div>
                    <div className="col-3">
                        <h4>{item.count}</h4>
                    </div>
                </div>
            </li>
    
    );
}

export default ItemInCart;