import { DecodedToken } from "../utility/TokenUtility.js";


export const AuthMiddleware = (req, res, next) => {
    let token = req.cookies.token
    let decoded = DecodedToken(token)

    if(decoded === null) {
        return res.status(401).json({message : 'Unauthorized'})
    }
    else{
        let email = decoded['email']
        let user_id = decoded['user_id']
        req.headers.email = email
        req.headers.user_id = user_id
        next()
    }
}