const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

require('dotenv').config()

//import routes
<<<<<<< HEAD
const authRoutes = require('./features/user/routes/auth')
const artistRoutes = require('./features/artist/routes')
const albumRoutes = require('./features/album/routes')
const collaboratorRoutes = require('./features/collaborator/routes')
const eventRoutes = require('./features/event/routes')

const braintreeRoutes = require('./features/shop/product/routes/braintree')
const orderRoutes = require('./features/shop/product/routes/order')
const placeRoutes = require('./features/place/routes')
const productRoutes = require('./features/shop/product/routes')
const productCategoryRoutes = require('./features/shop/product/routes/category')
const s3Routes = require('./features/site/routes/s3')
const twilioRoutes = require('./features/site/routes/twilio')
const userRoutes = require('./features/user/routes')
const verificationTokenRoutes = require('./features/user/routes/verificationToken')


/*place taxonomy */
const bathroomRoutes = require('./features/place/routes/bathroom')
const businessOwnerRoutes = require('./features/place/routes/businessOwner')
const communitiesServedRoutes = require('./features/place/routes/communitiesServed')
const foodOptionsRoutes = require('./features/place/routes/foodOptions')
const languageSpokenRoutes = require('./features/place/routes/languageSpoken')
const placeCategoryRoutes = require('./features/place/routes/placeCategory')
const {checkForVerification} = require('./features/user/controllers/password')
=======
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const collaboratorRoutes = require('./routes/collaborator')
const eventRoutes = require('./routes/event')
const braintreeRoutes = require('./routes/braintree')
const s3Routes = require('./routes/s3')
const productRoutes = require('./routes/product')
const productCategoryRoutes = require('./routes/productCategory')
const orderRoutes = require('./routes/order')
const artistRoutes = require('./routes/artist')
const albumRoutes = require('./routes/album')
>>>>>>> a534292884f416c05e28c2c063a936980ba8dc70


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
<<<<<<< HEAD

=======
app.use('/api', eventRoutes)
>>>>>>> a534292884f416c05e28c2c063a936980ba8dc70
app.use('/api', braintreeRoutes)
app.use('/api', orderRoutes)
app.use('/api', placeRoutes)
app.use('/api', productRoutes)
app.use('/api', productCategoryRoutes)
app.use('/api', s3Routes)
app.use('/api', twilioRoutes)
app.use('/api', userRoutes)
app.use('/api', verificationTokenRoutes)

/* place taxonomy */
app.use('/api', bathroomRoutes)
app.use('/api', businessOwnerRoutes)
app.use('/api', communitiesServedRoutes)
app.use('/api', foodOptionsRoutes)
app.use('/api', languageSpokenRoutes)
app.use('/api', placeCategoryRoutes)

const port = process.env.port || 9000

checkForVerification()

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
