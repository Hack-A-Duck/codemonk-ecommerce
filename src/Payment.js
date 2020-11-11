import React,{useState} from 'react'
import { useStateValue } from './ContextProvider';
import axios from 'axios' ;
import {Button }from "@material-ui/core";
import "./Payment.css"

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
    
    const price = state.price

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		
		axios.post('http://localhost:1337/dat',{amprice : state.price})


		const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: 'rzp_test_uGoq5ABJztRAhk' ,
			currency: 'INR',
			amount: data.amount.toString(),
			
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
			{console.log(state)}
			<div className="pay">
				<center>
            	<h2 className="paym">Payment</h2>
				</center>
				
				<div className="marg">
				<h5 className="det">Details</h5>
				<p className="name">{state.name}</p>
				<br></br>

				<p className="addres">{state.address}</p>
				<p className="addres" >{state.town},{state.city} - {state.pin} </p>
				
				<h5 className="det">Products</h5>
				{state.cart.map(prod=>(<div>
					<p className="titl"><strong>{prod.title}</strong></p>
				    <p className="pric">₹ {prod.price}</p>
					</div>
				))}
				</div>
				<center>
    			<Button className="buto"  onClick={displayRazorpay} variant="contained" color="secondary">Pay ₹{state.price}</Button>
				</center>
	    	</div>
		</div>
    )
}

export default Payment;
