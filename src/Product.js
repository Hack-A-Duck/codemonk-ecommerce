import React,{useEffect, useState} from 'react';
import "./Product.css";
import {Button }from "@material-ui/core";
import { useStateValue } from './ContextProvider';
const Product = ({id,title,des,price,image}) => {

    const [state,dispatch]=useStateValue();
    const [dis,setDis] =useState(false);
    const addProduct = () =>{
        
        dispatch({
            type:"ADD_PRODUCT",
            product:{
                id:id,
                title:title,
                image:image,
                price:price,
            }
        })
        setDis(true);
        console.log(state.cart)
    }
    

    return (
        <div className="product">
            
            <img className="product_image" src={image} />
            <div className="product_info">
            <strong>{title}</strong>
            
            <div>₹ {price}</div>
            
            </div>
            
            <Button disabled={dis} onClick={addProduct} variant="contained" color="secondary">
                 Add to Cart
            </Button>
        </div>
    )
}

export default Product;
