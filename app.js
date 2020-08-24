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
const businessRoutes = require('./routes/business')
const braintreeRoutes = require('./routes/braintree')
const s3Routes = require('./routes/s3')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const categoryRoutes = require('./routes/category')

const app = express()

//database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('DB connected'))


//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())


//routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', businessRoutes)
app.use('/api', braintreeRoutes)
app.use('/api', s3Routes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)
app.use('/api', categoryRoutes)

const port = process.env.port || 9000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})