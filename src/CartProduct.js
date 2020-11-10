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
            <div className="product1">
            
                <div className="cartproduct">
                <img className="cartproduct_image" src={image} />
                <div className="cartproduct_info">
                <p className="carttext">{title}</p>
                <p>{title}</p>
                <div>₹ {price}</div>
                
                <div className="price">₹ {price}</div>
                <br></br><br></br><br></br><br></br>
                <Button className="remove"  onClick={removeProduct} variant="contained" color="secondary">
                     Remove 
                </Button>
                   
                </div>
                
                </div>
                
                <Button onClick={removeProduct} variant="contained" color="secondary">
                     Remove 
                </Button>
                
    
            </div>
            
        )
    }
    

export default CartProduct;
