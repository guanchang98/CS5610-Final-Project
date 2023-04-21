import { useLocation, useNavigate} from 'react-router';


const CartAndHistoryItem = ({item, onClickDelete}) => {
    const {pathname} = useLocation();
    const paths = pathname.split('/');
    const currentAddress = paths[1];
    let navigate = useNavigate(); 

    return (
            <li className="list-group-item border-0">
                <div className="row">
                    <div className="col-2">
                        {/* <h4>{item.name}</h4> */}
                        <img src={item.image_url} width="50px" height="100px" alt="" 
                            onClick={() => navigate(`../details/${item._id}`, {state: item})}/>
                    </div>
                    <div className="col-5 ms-8">
                        <p>{item.name}</p>   
                        <p>${item.price}</p> 
                    </div>
                    {   
                         currentAddress === 'cart' && 
                         <>
                            <div className="col-3">
                                <p>Quality</p>
                                <p>{item.count}</p>
                            </div>
                            <div className="col-2">
                                <i className="bi bi-x-lg float-end"
                                    onClick={() => {console.log("delete"); onClickDelete(item)}}></i>
                            </div>    
                         </>
                    }
                    {
                        currentAddress !== 'cart' &&
                        <div className="col-5 text-center">
                            <p>Quality</p>
                            <p>{item.count}</p>
                        </div>
                    }
                
                </div>
                <hr/>
            </li>
        
    
    );
}

export default CartAndHistoryItem;