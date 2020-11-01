import React from 'react';
import "./Product.css";
import {Button }from "@material-ui/core";
const Product = ({id,title,des,price,image}) => {

    return (
        <div className="product">
            
            <img className="product_image" src={image} />
            <div className="product_info">
            <strong>{title}</strong>
            
            <div className="product_price">₹ {price}</div>
            
            </div>
            
            <Button variant="contained" color="secondary">
                 Add to Cart
            </Button>
        </div>
    )
}

export default Product;
