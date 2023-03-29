import React from "react";
import {useParams} from "react-router";
import BackButtonComponent from "../components/BackButtonComponent";

const DetailsPage = () => {
    const params = useParams();
    return (
        <div>
            <BackButtonComponent/>
            Detail page for item {params.detailsId};
        </div>
    )
}

export default DetailsPage;