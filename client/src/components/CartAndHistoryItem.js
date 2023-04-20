import React from "react";
import { useNavigate } from 'react-router';

const CartAndHistoryItem = ({item}) => {
    let navigate = useNavigate(); 
    // console.log("product item: ", item);
    return (
        
            <li className="list-group-item">
                <div className="row">
                    <div className="col-8">
                        <h4>{item.name}</h4>
                        <img src={item.image_url} width="50px" height="100px" onClick={() => navigate(`../details/${item._id}`, {state: item})}/>
                    </div>
                    <div className="col-2">
                        <h4>${item.price}</h4>
                    </div>
                    <div className="col-2">
                        <h4>{item.count}</h4>
                    </div>
                </div>
            </li>
    
    );
}

export default CartAndHistoryItem;