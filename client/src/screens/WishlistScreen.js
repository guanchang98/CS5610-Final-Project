import React, {
    useEffect,
    useState
} from "react";
import BackButtonComponent from "../components/BackButtonComponent";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    findLikeProductListById
} from "../services/product-list/product-list-service";
import ProductsList from "../components/ProductsList";
import {
    findProductByObjectIdThunk
} from "../services/products/products-thunks";

/**
 * Functional component representing buyer's wishlist of want-to-buy products.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
const WishlistScreen = () => {
    const {currentUser} = useSelector(state => state.users);
    const [likeProducts, setLikeProducts] = useState([]);
    const dispatch = useDispatch();

    const getLikeProductList = async () => {
        if (currentUser && currentUser._id) {
            const response = await findLikeProductListById(currentUser._id).then(
                async (result) => {
                    let products = [];
                    for (let i = 0; i < result.length; i++) {
                        const prod = await getItembyId(result[i].productId);
                        products.push(prod.payload);
                    }
                    setLikeProducts(products);
                }
            )
        }

    }

    const getItembyId = async (id) => {
        const response = await dispatch(findProductByObjectIdThunk(id));
        return response;
    }

    const loadScreen = async () => {
        await getLikeProductList();
    };

    useEffect(() => {
        //fetch buyers' wish list
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