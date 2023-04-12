import React from "react";
import {useNavigate} from "react-router";

const BackButtonComponent = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate(-1)} className="btn">
                <i className="bi bi-arrow-left"></i>
            </button><br/>
        </div>

    )
}

export default BackButtonComponent;