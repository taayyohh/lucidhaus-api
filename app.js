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
const artistRoutes = require('./features/artist/routes')
const albumRoutes = require('./features/album/routes')
const collaboratorRoutes = require('./features/collaborator/routes')
const eventRoutes = require('./features/event/routes')

const braintreeRoutes = require('./features/shop/product/routes/braintree')
const orderRoutes = require('./features/shop/product/routes/order')
const productRoutes = require('./features/shop/product/routes')
const productCategoryRoutes = require('./features/shop/product/routes/category')
const s3Routes = require('./features/site/routes/s3')
const twilioRoutes = require('./features/site/routes/twilio')
const userRoutes = require('./features/user/routes')
const verificationTokenRoutes = require('./features/user/routes/verificationToken')


const {checkForVerification} = require('./features/user/controllers/password')


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
app.use('/api', artistRoutes)
app.use('/api', albumRoutes)
app.use('/api', eventRoutes)
app.use('/api', collaboratorRoutes)

app.use('/api', braintreeRoutes)
app.use('/api', orderRoutes)
app.use('/api', productRoutes)
app.use('/api', productCategoryRoutes)
app.use('/api', s3Routes)
app.use('/api', twilioRoutes)
app.use('/api', userRoutes)
app.use('/api', verificationTokenRoutes)

/* place taxonomy */
const port = process.env.port || 9000

checkForVerification()

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
