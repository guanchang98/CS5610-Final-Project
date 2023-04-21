import React, {useEffect, useState} from "react";
import BackButtonComponent from "../components/BackButtonComponent";
import {useDispatch, useSelector} from "react-redux";
import {findLikeProductListById} from "../services/product-list/product-list-service";
import ProductsList from "../components/ProductsList";
import {findProductByObjectIdThunk} from "../services/products/products-thunks";

const WishlistScreen = () => {
    const {currentUser} = useSelector(state => state.users);
    const [likeProducts, setLikeProducts] = useState([]);
    const dispatch = useDispatch();

    const getLikeProductList = async () => {
        const response = await findLikeProductListById(currentUser._id).then(
            async (result) => {
                let products = [];
                for (let i = 0; i < result.length; i++) {
                    const prod = await getItembyId(result[i].productId);
                    console.log(prod.payload);
                    products.push(prod.payload);
                }
                setLikeProducts(products);
                console.log(likeProducts);
            }
        )
    }

    const getItembyId = async (id) => {
        // console.log("wait to get item by id")
        const response = await dispatch(findProductByObjectIdThunk(id));
        // console.log("item from getItemById function: ", response.payload);
        return response;
    }

    const loadScreen = async () => {
        await getLikeProductList();
    };

    useEffect(() => {
        loadScreen();
    }, [currentUser]);

    return (
        <div>
            <BackButtonComponent/>
            <h1>Wishlist</h1>
            {
                currentUser && currentUser._id &&
                <ProductsList productArray={likeProducts}/>
            }
        </div>
    )
}

export default WishlistScreen;