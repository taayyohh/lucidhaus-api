const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

require('dotenv').config()

//import routes
const authRoutes = require('./features/user/routes/auth')
const braintreeRoutes = require('./features/shop/product/routes/braintree')
const orderRoutes = require('./features/shop/product/routes/order')
const placeRoutes = require('./features/place/routes')
const productRoutes = require('./features/shop/product/routes')
const productCategoryRoutes = require('./features/shop/product/routes/category')
const s3Routes = require('./features/site/routes/s3')
const twilioRoutes = require('./features/site/routes/twilio')
const userRoutes = require('./features/user/routes')

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
app.use('/api', braintreeRoutes)
app.use('/api', orderRoutes)
app.use('/api', placeRoutes)
app.use('/api', productRoutes)
app.use('/api', productCategoryRoutes)
app.use('/api', s3Routes)
app.use('/api', twilioRoutes)
app.use('/api', userRoutes)

const port = process.env.port || 9000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
