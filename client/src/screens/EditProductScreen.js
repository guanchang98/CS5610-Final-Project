import React, {
    useEffect,
    useState
} from "react";
import {
    useDispatch
} from "react-redux";
import {
    useLocation
} from "react-router";
import {
    useNavigate
} from "react-router";
import {
    findProductByIdThunk
} from "../services/products/products-thunks";
import {
    updateProductById
} from "../services/products/products-service";

/**
 * Functional component representing a page for sellers to edit owned products' details.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
const EditProductScreen = () => {

    const { state } = useLocation();
    console.log("product: ", state)
    const [product, setProduct] = useState(state);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const saveEditButton = async () => {
        await updateProductById(product);
        navigate(`/details/${state._id}`, {state: product});
    }

    const cancelButton = () => {
        navigate(`/details/${product._id}`, {state: product});
    }

    const fetchProduct = async () => {
        const response = await dispatch(findProductByIdThunk(product.product_id));
        setProduct(response.payload);
    }    

    const loadScreen = async() => {
        await fetchProduct();
    }

    useEffect(() => {
        //fetch product information which user will edit
        loadScreen();
    }, [])


    return (
        <div>
            <h2>Edit Product</h2>

            <div className="row mt-5">
                    <div className="col-5 text-center">
                        <img className="rounded wd-punk-image-size-detail" src={product.image_url} alt='' width='100%'/>
                    </div>
                    <div className="col-5">
                        <div className="mb-5">
                            <div className="form-floating mt-1">
                                <textarea 
                                    className="form-control" 
                                    value={product.name} 
                                    id="name"
                                    onChange={(e) => {  
                                        setProduct({
                                            ...product, 
                                            name: e.target.value,
                                        })
                                    }}>
                                </textarea>
                                <label htmlFor="name">Name</label>
                            </div>
                            <br/>
                            <div className="form-floating mt-1">
                                <textarea 
                                    className="form-control" 
                                    value={product.price} 
                                    id="price"
                                    onChange={(e) => {  
                                        setProduct({
                                            ...product, 
                                            price: e.target.value,
                                        })
                                    }}>
                                </textarea>
                                <label htmlFor="name">Price</label>
                            </div>
                            <br/>
                            <div className="form-floating mt-1">
                                <textarea 
                                    className="form-control h-50" 
                                    value={product.description} 
                                    id="description"
                                    rows = "8"
                                    onChange={(e) => {  
                                        setProduct({
                                            ...product, 
                                            description: e.target.value,
                                        })
                                    }}>
                                </textarea>
                                <label htmlFor="description">Description</label>
                            </div>
                            <br/>
                            <br/>

                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button className="btn btn-primary"
                                         onClick={saveEditButton}>
                                    Save
                                </button>
                                <button className="btn btn-danger"
                                        onClick={cancelButton}>
                                    cencel
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default EditProductScreen;