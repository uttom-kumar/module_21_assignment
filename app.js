import {DATABASE, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE, WEB_JSON_SIZE } from './src/config/config.js'


// TODO : BASIC LIBRATY IMPORT
import express, { Router } from 'express'
import bodyParser from 'body-parser'
// TODO : SECURITY MIDDLEWARE LIBRARY IMPORT
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import cors from 'cors'
import hpp from 'hpp'
// TODO : MONGODB LIBRATY IMPORT
import mongoose from 'mongoose'
import router from './src/routes/api.js'
import cookieParser from 'cookie-parser'

const app = express()
/* ---- ---- */
// TODO : SECURITY MIDDLEWARE LIBRATY IMPLEMENT
app.use(bodyParser.json())
app.use(mongoSanitize())
app.use(helmet())
app.use(cors())
app.use(hpp())
app.use(cookieParser())
// TODO : RATE LIMITER CONFIGURATION IMPLEMENT
app.use(express.json({limit : WEB_JSON_SIZE}))
app.use(express.urlencoded({extended : URL_ENCODE}))
const limiter  = rateLimit( {windowMs : REQUEST_TIME, max : REQUEST_NUMBER})
app.use(limiter)
// TODO :CACHE CONFIGURATION
app.set('etag' , WEB_CACHE)
/* ------ ------ */
// TODO : MONGODB/MONGOOSE CONFIGURATION
let URL = DATABASE
let OPTION = {user: '', pass: '', autoIndex : true}
mongoose.connect(URL, OPTION).then(()=> {
    try{
        console.log('Connected to MongoDB')
    }
    catch(e){
        console.log('Connection Error : ', e)
    }
})




// TODO : ROUTING CONFIGURATION
app.use('/api', router)
app.use('/*', (req, res) => {
    res.send('404 page not found')
})
export default app;