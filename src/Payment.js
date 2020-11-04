import React from 'react'
import { useStateValue } from './ContextProvider';



const Payment = () => {
    const [state,dispatch] = useStateValue();

    return (
        <div>
            <h1>Payment</h1>
            {console.log(state)}
        </div>
    )
}

export default Payment;
