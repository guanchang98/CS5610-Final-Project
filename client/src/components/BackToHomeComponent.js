import React from "react";
import {
    Link
} from "react-router-dom";

const BackButtonComponent = () => {
    return (
        <div>
            <Link to="../../home" className="btn btn-link">Back Home</Link><br/>
        </div>

    )
}

export default BackButtonComponent;