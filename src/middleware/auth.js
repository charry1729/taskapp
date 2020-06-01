
//const app = require('../index')

// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send("gets are disabled")
//     }else{
//         next()
//     }
//     console.log(req.method,req.path);
//   next()  
// })
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = new express.Router()

const auth = router.use(async (req,res,next)=>{
    // if(req.method === 'GET'|| req.method === 'POST' || req.method === 'PATCH' || req.method === 'DELETE'){
         ///res.status(503).send("site maintainenc")
        console.log("middleware");

 //     }else{
 //       next()
 //     }
 // //    console.log(req.method,req.path);

try {
    const token = req.header('Authorization').replace('Bearer ','')
    console.log("t "+token);
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    console.log("d : "+decoded);
    
    const user = await User.findOne({'_id' : decoded._id,'tokens.token' : token })
    console.log("user :"+user);
    
    if(!user){
        throw new Error()
    }
    req.user = user
    req.token= token
    next()  
    console.log(token);

    } catch (e) {
    res.status(404).send({error : 'Please authenticate'})
    
}


 })

 module.exports = auth