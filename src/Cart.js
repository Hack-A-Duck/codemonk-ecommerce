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


    const handle = ()=>{
       history.push('/checkout/address');
       const price = getTotal(state.cart);
        console.log("heeloleo",price)
       dispatch({
            type:'SET_PRICE',
            price:price
        })


    }

    return (
        <div >
            <h1 className="cartheading">Shopping Cart</h1>
            <div className="cart">
            <div>
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
            <div className="cart_details">
                
                <CurrencyFormat
                    renderText={(value) => (
                    <>
                       <p className="headingcart">PRICE DETAILS <br></br> ( {state.cart?.length} items )</p>
                       <br></br><br></br>
                    <p className="pricingdetails">Total Price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="pricingvalue">{value} </span> </p>
                        <p className="pricingdetails">Delivery Charges &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="pricingvalue">₹0</span></p>
                        <br></br><br></br><br></br><hr className="line"></hr><br></br>
                        
                        <p className="pricingdetails1">Total Amount &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {value} </p><br></br><br></br>
                    </>
                    )}
                    decimalScale={2}
                    value={getTotal(state.cart)} 
                    displayType={"text"} 
                    thousandSeparator={true}
                    prefix={"₹"}
                />

            <Button classname="placeorder" disabled={state.user ? false:true } onClick={handle} variant="contained" color="secondary">
                 PLACE ORDER
            </Button>
            <br></br><br></br>
            {!state.user?<p className="pricingdetails2">Please Sign In to continue </p>:<p></p>}
            </div>
            
            </div>
            
        </div>
    )
}

export default Cart;
