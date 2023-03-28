import React from "react";
import {useParams} from "react-router";

const DetailsPage = () => {
    const params = useParams();
    return (
        <div>
            Detail page for item {params.detailsId};
        </div>
    )
}

export default DetailsPage;