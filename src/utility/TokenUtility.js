import jwt from 'jsonwebtoken'
import { JWT_EXPIRE_TIME, JWT_KEY } from './../config/config.js';

export const EncodedToken = (email,user_id) => {
    let KEY = JWT_KEY
    let EXPIRE  = {expiresIn: JWT_EXPIRE_TIME}
    let PAYLOAD = {
        email : email,
        user_id : user_id
    }
    let token = jwt.sign(PAYLOAD, KEY, EXPIRE)
    return token
}


export const DecodedToken = (token) => {
    try{
        let KEY = JWT_KEY
        return jwt.verify(token, KEY)
    }
    catch(err){
        return null
    }
}