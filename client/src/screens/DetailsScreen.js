import React, { useState } from "react";
import {useLocation, useParams} from "react-router";
// import BackButtonComponent from "../components/BackButtonComponent";

const DetailsScreen = () => {
    // const params = useParams();
    const { state } = useLocation();
    const [count, setCount] = useState(1);
    const [liked, setLiked] = useState(false);
    const seller = true;

    const likeButton = () => {
        setLiked(!liked);
    }
    
    return (
        <div>
            {/* <BackButtonComponent/> */}
            {/* Detail page for item {params.detailsId}; */}
            <h2>Product Detail</h2>
           
                <div className="row mt-5">
                    <div className="col-5 text-center">
                        <img className="rounded wd-punk-image-size-detail" src={state.image_url} alt='' width='100%'/>
                    </div>
                    <div className="col-5">
                        <div className="mb-5">
                            <h3 className="fw-bold text-secondary">{state.name}</h3>
                            <div className="mt-1">
                                <ul className="list-unstyled">
                                    <li><h3 className="fw-bold">${state.price}
                                        <i className={`${liked? 'bi bi-heart-fill text-danger': 'bi bi-heart'} float-end me-2`}
                                            onClick={likeButton}></i>
                                    </h3></li>
                                </ul>
                            </div>
                            <p className="text-secondary">{state.description}</p>
                        </div>

                        <div className="row mt-5">
                            <div className="col-6">
                                <select
                                        className="form-select"
                                        value={count}
                                        onChange={(e) => {
                                        setCount(e.target.value);
                                        }}>
                                    <option defaultValue>Select Quaility</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="col-5">
                                <button className="btn btn-primary float-end"
                                        onClick={()=>{console.log("add button")}}>
                                        Add To Cart
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                {   
                    seller && 
                    <div className="d-grid gap-2 col-2 mx-auto mt-5">
                        <button className="btn btn-danger">
                            Edit
                        </button>
                    </div>
                }
        </div>
    )
}

export default DetailsScreen;