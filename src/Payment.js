import React,{useState} from 'react'
import { useStateValue } from './ContextProvider';
import{getTotal}from "./reducer"
 
function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'


const Payment = () => {
    const [state,dispatch] = useStateValue();
    
    const price = getTotal(state.cart)

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
			state.json()
		)

		console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_uGoq5ABJztRAhk' : 'PRODUCTION_KEY',
			currency: 'INR',
			amount: price.toString(),
			
			name: state.name,
			description: 'Thank you for shopping with us !',
			image: '',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name:state.name,
				email:state.user.email,
				phone_number: state.mobile
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}


    return (
        <div>
            <h1>Payment</h1>
            {console.log(state)}
    <button onClick={displayRazorpay}>Pay ₹{price}</button>
        </div>
    )
}

export default Payment;
