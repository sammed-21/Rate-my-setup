const jwt =require('jsonwebtoken')

const {SECRET_KEY} = require("../config")

const {UnauthorizedError} = require('../utils/errors')

// create a function to extract the JWT from the requrest header

const jwtFrom = ({headers}) =>{
    if(headers?.authorization){

        const [schema, token]= headers.authorization.split(" ")
        if(schema.trim() ==='Bearer'){
            return token;
        }
        
    }
    return undefined;
}

// create a func to attach the user to the res

const extractUserFromJwt = (req, res, next)=>{
    try {
        const token = jwtFrom(req);
        if(token){
            res.locals.user = jwt.verify(token, SECRET_KEY)
        }
        return next();
    } catch (error) {
        return next();
        
    }

    
}

// create a function to verify a authed user exists

const requireAuthenticatedUser = (req,res,next) =>{
    try {
        const {user} = res.locals;
        if(!user?.email){
            throw new UnauthorizedError()
        }
        return next()
    } catch (error) {
        return next(error);
    }
}

module.exports ={
    requireAuthenticatedUser,
    extractUserFromJwt
}