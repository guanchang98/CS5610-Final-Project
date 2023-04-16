import React from "react";
import {Link} from "react-router-dom";

const SearchBar = () => {
    return (
        <div className="row">
            <div className="col-11 position-relative">
                <input
                    placeholder="Search Tuiter"
                    className="form-control rounded-pill ps-5"
                />
                <i
                    className="bi bi-search position-absolute
                       wd-nudge-up"
                ></i>
            </div>
            <div className="col-1">
                <Link to="../search" className="btn btn-primary">
                    Search
                </Link>
            </div>
        </div>
    );
}

export default SearchBar;