import React from 'react'
import CartProduct from './CartProduct';
import { useStateValue } from './ContextProvider';
import CurrencyFormat from "react-currency-format";
import "./Cart.css"
import {Button }from "@material-ui/core";
import { useHistory } from "react-router-dom";
import{getTotal}from "./reducer"
function Cart() {
    const history= useHistory();
    const [state,dispatch]=useStateValue();

    return (
        <div >
            <h1>Cart</h1>
            <div className="cart">
            <div className="cart_products">
            {
                state.cart.map(prod =>(
                    <CartProduct 
                    id={prod.id}
                    title={prod.title}
                    price={prod.price}
                    image={prod.image}
                     />
                ) )
            }
            </div>
            <div className="car_details">
                
                <CurrencyFormat
                    renderText={(value) => (
                    <>
                       <p>PRICE DETAILS ( {state.cart?.length} items )</p>
                    <p>Total Price  {value}</p>
                        <p>Delivery Charges <span>₹ 0</span></p>
                        
                        <p>Total Amount  {value}</p>
                    </>
                    )}
                    decimalScale={2}
                    value={getTotal(state.cart)} 
                    displayType={"text"} 
                    thousandSeparator={true}
                    prefix={"₹"}
                />

            <Button onClick={e => history.push('/checkout/address')} variant="contained" color="secondary">
                 PLACE ORDER
            </Button>
            </div>
            
            </div>
            
        </div>
    )
}

export default Cart;
