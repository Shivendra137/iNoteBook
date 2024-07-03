const express = require("express");
const  fetchuser  = require('../middlewares/fetchuser')
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt"); /// this package is used to use salt , hash, pepper
const User = require("../models/User");
const routerAuth = express.Router();
const { body, validationResult } = require("express-validator"); /// install the package  npm i --save express-validator
const JWT_SECRET = "shiv$is#nice**"; // install the package jsonwebtoken to use this secret

// Router-1 : Create a new user
routerAuth.post(
  "/createUser",

  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be atleast 5 char").isLength({ min: 5 }),
  ],

  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success,
        errors: errors.array(), //sare errors ko print karwadiya
      });  // simply errors ko print kra diya aur age nhi gye 
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({
          success,
          error: " sorry , a user with this email already exists",
        });
      }

      // also install the bcrypt package
      const salt = await bcrypt.genSalt(10); // yha promise return hoga isliye await use hua
      securePass = await bcrypt.hash(req.body.password, salt); // yha promise return hoga isliye await use hua

      const uzer = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });

      // .then(
      //   user => res.json(user)
      // )
      // .catch(error=> {

      //   // console.log(error);
      //   res.json({error: "plz enter a unique email value",

      //        message: error.errmsg

      //   })
      // })

      const data = {
        id: uzer._id,
        
      };

      const authToken = jwt.sign(data, JWT_SECRET); // here data is the payload data as before
      success=true;
      console.log(authToken);

      res.json({
        success,
        message: "success",
        uzer,
        authToken,
      });
    } catch (error) {
      {
        console.log(error);
        res.status(500).send("Internal server error");
      }
    }
  }
);

// Router-2 : Authentication of a user(login)
routerAuth.post(
  "/login",

  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists().notEmpty(),
  ],

  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(), //sare errors ko print karwadiya
      });
    }

    const { email, password } = req.body;

    try{
let user = await User.findOne({email})

     if(!user) {
      success=false;
      return res.status(400).json({ success,
        error: "try to login with correct credentials"
      })
     }

      const passwordCompare = await bcrypt.compare(password, user.password)

      if(!passwordCompare) {
        success=false;
        return res.status(400).json({   success,
          error: "try to login with correct credentials"
        })
      }

      const payload= {

        
          id: user._id
        
      }

      const authToken = jwt.sign(payload, JWT_SECRET)
      success=true;
      res.json({
       success, authToken///this is basically success: success, authToken: authToken
      })
    }
    catch(error){

      
        console.log(error);
        res.status(500).send("Internal server error");
      
    }
  }
);


// Router-3 : Get loggedIn User details using POST "/api/auth/getuser". Login required 


routerAuth.post('/getUser', fetchuser, async (req,res) => {

  try {
   const userId = req.user.id;
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
   console.log(error);
   res.status(500).send("Internal server error");
 
  }

})


module.exports = routerAuth, JWT_SECRET;
 