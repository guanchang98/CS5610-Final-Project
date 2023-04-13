import React, {useEffect, useState} from "react";
import ProductsList from "../components/ProductsList";
import {Link} from "react-router-dom";
import {fullTextSearch} from "../services/products/products-service";

const HomeScreen = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const searchPunk = async () => {
        const query = search === "" ? "" : "beer_name=" + search;
        let response = await fullTextSearch(query);
        response = response.map(item => ({...item, price: 9.99}))
        setResults(response);
    }
    useEffect(() => {
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
