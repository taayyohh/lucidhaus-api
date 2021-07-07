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
const verificationTokenRoutes = require('./features/user/routes/verificationToken')


/*user taxonomy*/
const adaptiveEquipmentRoutes = require('./features/user/routes/adaptiveEquipment')
const bodyModificationRoutes = require('./features/user/routes/bodyModification')
const genderRoutes = require('./features/user/routes/gender')
const languageRoutes = require('./features/user/routes/language')
const methodOfCommunicationRoutes = require('./features/user/routes/methodOfCommunication')
const physicalAppearanceRoutes = require('./features/user/routes/physicalAppearance')
const pronounRoutes = require('./features/user/routes/pronoun')
const raceRoutes = require('./features/user/routes/race')
const serviceAnimalRoutes = require('./features/user/routes/serviceAnimal')
const sexualOrientationRoutes = require('./features/user/routes/sexualOrientation')

/*place taxonomy */
const bathroomRoutes = require('./features/place/routes/bathroom')
const businessOwnerRoutes = require('./features/place/routes/businessOwner')
const communitiesServedRoutes = require('./features/place/routes/communitiesServed')
const foodOptionsRoutes = require('./features/place/routes/foodOptions')
const languageSpokenRoutes = require('./features/place/routes/languageSpoken')
const placeCategoryRoutes = require('./features/place/routes/placeCategory')
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
app.use('/api', braintreeRoutes)
app.use('/api', orderRoutes)
app.use('/api', placeRoutes)
app.use('/api', productRoutes)
app.use('/api', productCategoryRoutes)
app.use('/api', s3Routes)
app.use('/api', twilioRoutes)
app.use('/api', userRoutes)
app.use('/api', verificationTokenRoutes)
/* user taxonomy */
app.use('/api', adaptiveEquipmentRoutes)
app.use('/api', bodyModificationRoutes)
app.use('/api', genderRoutes)
app.use('/api', languageRoutes)
app.use('/api', methodOfCommunicationRoutes)
app.use('/api', physicalAppearanceRoutes)
app.use('/api', pronounRoutes)
app.use('/api', raceRoutes)
app.use('/api', serviceAnimalRoutes)
app.use('/api', sexualOrientationRoutes)
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
