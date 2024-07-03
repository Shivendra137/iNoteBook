const jwt = require("jsonwebtoken");
// const JWT_SECRET = require('../routes/auth')
const JWT_SECRET = 'shiv$is#nice**'
const fetchuser = (req, res, next) => {
 
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token')
    if(!token){

        res.status(401).send({
            error: "plz authenticate using a valid token"
        })
    }


   
    try {
        const data = jwt.verify(token, JWT_SECRET)  // this data is our payloaddata( contains the id, role etc)
        req.user = data;
        next();
    
    } catch (error) {
        res.status(401).send({
            error: "plz authenticate using a valid token"
        })
    }
}

module.exports= fetchuser;