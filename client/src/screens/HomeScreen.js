import React, {
    useEffect,
    useState
} from "react";
import ProductsList from "../components/ProductsList";
import {
    Link
} from "react-router-dom";
import {
    fullTextSearch
} from "../services/products/products-service";
import {
    createProductThunk,
    findProductsThunk
} from "../services/products/products-thunks";
import {
    useDispatch
} from "react-redux";
import {
    useNavigate,
    useParams
} from "react-router";


/**
 * Functional component representing home screen which will be loaded when user open the website.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
const HomeScreen = () => {
    const [results, setResults] = useState([]);
    const dispatch = useDispatch();
    const {searchString} = useParams();
    const [search, setSearch] = useState(searchString || "");
    const navigate = useNavigate();

    const saveProductsToDBAndReturn = async (product) => {
        const [createResponse] = await Promise.all([
            dispatch(createProductThunk(product)),
        ]);
        const {payload} = createResponse;
        return payload;
    }

    const findProducts = async () => {
            const [findResponse] = await Promise.all([
                dispatch(findProductsThunk()),
            ]);
            const {payload} = findResponse;
            return payload;
    }

    const searchPunk = async () => {
        const query = search === "" ? "" : "beer_name=" + search;
        if(!search){
            let response = await findProducts();
            setResults(response);
        }
        else{
            let response = await fullTextSearch(query);
            for (let i = 0; i < response.length; i++) {
                response[i] = {
                    product_id: response[i].id,
                    name: response[i].name,
                    description: response[i].description,
                    image_url: response[i].image_url,
                    price: 9.99,
                    first_brewed: response[i].first_brewed,
                }
                response[i] = await saveProductsToDBAndReturn(response[i]);
            }
            setResults(response);
        }
        if (!search) {
            navigate("/home");
        } else {
            navigate(`/search/${search}`);
        }
    }
    useEffect(() => {
        //fetch all products available from mongodb database
        searchPunk();
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-11 position-relative">
                    <input
                        placeholder="Search Punk"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control rounded-pill ps-5"
                    />
                    <i
                        className="bi bi-search position-absolute
                       wd-nudge-up"
                    ></i>
                </div>
                <div className="col-1" onClick={searchPunk}>
                    <Link to="../search" className="btn btn-primary">
                        Search
                    </Link>
                </div>
            </div>
            <ProductsList productArray={results}/>
        </>
    );
};

export default HomeScreen;
