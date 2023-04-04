import React from "react";
import ProductItem from "./ProductItem";

const ProductsList = () => {
    const itemsArray = [
        {id: "p111111", 
         name: "iphone case, sillicone", 
         price: 10.00,
         description: "While Bootstrap uses ems or rems for defining most sizes, pxs are used for grid breakpoints and container width.",
         image: "iphone-case.png"
        },
        {id: "p222222", 
         name: "iphone 13 case",
         price: 10.00,
         description: "While Bootstrap uses ems or rems for defining most sizes, pxs are used for grid breakpoints and container width.",
         image: "iphone-case.png",
        },
        {id: "p333333", 
         name: "iphone case 3", 
         price: 10.00,
         description: "While Bootstrap uses ems or rems for defining most sizes, pxs are used for grid breakpoints and container width.", 
         image: "iphone-case.png",
        },
         {id: "p444444", 
         name: "iphone case 3, sillicon", 
         price: 10.00,
         description: "While Bootstrap uses ems or rems for defining most sizes, pxs are used for grid breakpoints and container width.", 
         image: "iphone-case.png",},
    ];
    return (
        // <ul className="list-group mt-2">
        //     {
        //         itemsArray.map(item =>
        //             <ProductItem
        //                 key={item.id} item={item}/> )
        //     }
        // </ul>
        <div className="row mt-2 justify-content-between">
            {
                itemsArray.map(item =>  
                    <ProductItem
                        key={item.id} item={item}/> )
            }

        </div>
    );
}

export default ProductsList;