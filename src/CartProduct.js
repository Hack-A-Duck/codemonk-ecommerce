import React from 'react'
import {Button }from "@material-ui/core";
import { useStateValue } from './ContextProvider';
import "./CartProduct.css";


function CartProduct({id,image,title,price}) {
    
    const [state,dispatch] =useStateValue();

    const removeProduct = () => {
           dispatch({
               type:'REMOVE_PRODUCT',
               id:id
           })
    }
    return (
        <div>
            <div className="cartproduct">
            <img className="cartproduct_image" src={image} />
            <div className="cartproduct_info">
            <p>{title}</p>
            <div>₹ {price}</div>
            
            </div>
            </div>
            <Button onClick={removeProduct} variant="contained" color="secondary">
                 Remove 
            </Button>
            

        </div>
    )
}

export default CartProduct;
