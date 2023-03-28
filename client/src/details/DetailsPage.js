import React from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

const DetailsPage = () => {
    const params = useParams();
    return (
        <div>
            <Link to="../home">Back</Link><br/>
            Detail page for item {params.detailsId};
        </div>
    )
}

export default DetailsPage;