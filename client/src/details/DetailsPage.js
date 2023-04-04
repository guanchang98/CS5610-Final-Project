import React from "react";
import {useLocation, useParams} from "react-router";
import BackButtonComponent from "../components/BackButtonComponent";

const DetailsPage = () => {
    // const params = useParams();
    const { state } = useLocation();
    
    return (
        <div>
            <BackButtonComponent/>
            {/* Detail page for item {params.detailsId}; */}
            <h2>Product Detail</h2>
           
                <div className="row">
                    <div className="col-7">
                        <img className="rounded" src={`/image/${state.image}`} alt='' width='100%'/>
                    </div>
                    <div className="col-4 ms-4">
                        <h3 className="fw-bold text-secondary">{state.name}</h3>
                        <h3 className="fw-bold">${state.price}</h3><br/>
                        <p className="text-secondary">{state.description}</p>

                        <div className="row justify-content-between mb-2">
                            <button type="button" className="col-5 btn btn-primary btn-sm ms-2"
                                onClick={()=>{console.log("add button")}}>
                                Add To Cart
                            </button>
                            <button type="button" className="col-5 btn btn-sm btn-primary">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default DetailsPage;