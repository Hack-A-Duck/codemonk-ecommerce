import React from 'react'
import CartProduct from './CartProduct';
import { useStateValue } from './ContextProvider';
import "./Cart.css"


function Cart() {

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
                    image={prod.image} />
                ) )
            }
            </div>
            <div className="car_details">
                <p>PRICE DETAILS ( {state.cart?.length} items )</p>
            </div>
            </div>
        </div>
    )
}

export default Cart;
