const app = require('express')()
const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

const razorpay = new Razorpay({
	key_id: 'rzp_test_lk8EQB6Jj5J0gI',
	key_secret: '6X2GCKJxvk5D4XHHyJFIumkP'
})


app.get('/', (req, res) => {
	res.send('hello world')
})

let tot =3;


app.post('/dat',(req,res)=>{
	tot = req.body.amprice
})


app.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = tot;
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

app.listen(1337, () => {
	console.log('Server has started')
})
