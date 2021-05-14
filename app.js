const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

require('dotenv').config()

//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const twilioRoutes = require('./routes/twilio')
const braintreeRoutes = require('./routes/braintree')
const s3Routes = require('./routes/s3')
const productRoutes = require('./routes/product')
const productCategoryRoutes = require('./routes/productCategory')
const orderRoutes = require('./routes/order')
const placeRoutes = require('./routes/place')


const app = express()

//database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('DB connected'))

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

//routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', twilioRoutes)
app.use('/api', braintreeRoutes)
app.use('/api', s3Routes)
app.use('/api', productRoutes)
app.use('/api', productCategoryRoutes)
app.use('/api', orderRoutes)
app.use('/api', placeRoutes)

const port = process.env.port || 9000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
