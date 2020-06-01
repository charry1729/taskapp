const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require("multer")

// var upload = multer({ 
//     dest: 'avatars/' ,
//     limits : {
//     fileSize : 1000000,    //1mb
//     },
//     fileFilter(req,file,cb){
// //        if(!file.originalname.endsWith('pdf')){
//          if(!file.originalname.match(/\.(doc|docx)$/)){
//                 return cb(new Error('file must be word doc'))
//         }
//         // cb(new Error('file must be pdf'))
//         cb(undefined, true)
//         // cb(undefined,false)
//     }    
// })
var upload = multer({ 
 //    dest: 'avatars/' ,
    limits : {
    fileSize : 1000000,    //1mb
    },
    fileFilter(req,file,cb){
//        if(!file.originalname.endsWith('pdf')){
         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
                return cb(new Error('file must be word jpg'))
        }
        // cb(new Error('file must be pdf'))
        cb(undefined, true)
        // cb(undefined,false)
    }    
})

// const errorMiddleware = (req,res,next)=>{
//     throw new Error(' From my middleware')
// }
//router.post('/upload/me/avatar',errorMiddleware,upload.single('avatars'),(req,res)=>{
   
//router.post('/upload/me/avatar',errorMiddleware,(req,res)=>{

router.post('/upload/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
    
    const buffer = await sharp(req.file.buffer).resize({
        width : 250,
        height : 250
    }).png().toBuffer()

    req.user.avatar = buffer
    //req.user.avatar = req.file.buffer
    await req.user.save()
    res.status(200).send();
},(error,req,res,next)=> {
    res.status(400).send({error : error.message})
})



router.delete('/upload/me/avatar',auth,async (req,res)=>{
    //delete req.user.avatar //= req.file.buffer
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send();
})

router.get('users/:id/avatar',async (req,res)=>  {
    try {
        const user =await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
//        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})   


router.post('/users/signup', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login',async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        console.log(user);
        
        console.log("user.getPublicProfile() :  "+user.getPublicProfile());
        
       res.send({user : await user.getPublicProfile(),token})
        
    } catch (e) {
        res.status(400).send()        }


})

router.post('/users/logout',auth,async (req,res)=>{

    try {
        console.log("caem erge");
        console.log(req.user);
        
        
        req.user.tokens = req.user.tokens.filter((token)=>{

            console.log(token.token);
            console.log(req.token);
            
            
            return token.token != req.token
        })

        console.log(req.user.tokens);
        
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
        
    }
} )

router.post('/users/logoutAll',auth,async (req,res)=>{

    try {
        console.log("came erge");
        console.log(req.user);
        req.user.tokens = []
        //req.user.tokens.length = 0        
        // req.user.tokens = req.user.tokens.filter((token)=>{

        //     console.log(token.token);
        //     console.log(req.token);
            
            
        //     return token.token != req.token
        // })

        console.log(req.user.tokens);
        
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
        
    }
} )

router.get('/users/me',auth,async(req,res)=>{

    
    res.send(req.user)
    // try {
    //     const users = await User.find({})
    //     console.log(users);
    //     res.status(200).send(users)
    // } catch (error) {
    //     res.status(500).send(error)
    // }
        //     User.find({
    // //        name : 'chary'
    //     }).then((users)=>{
    //         console.log(users);
    //         res.send(users).status(200)
            
    //     }).catch((error)=>{
    //         res.send(error).status(500)
    //     })
    })


router.get('/users',auth,async(req,res)=>{

    
        try {
            const users = await User.find({})
            console.log(users);
            res.status(200).send(users)
        } catch (error) {
            res.status(500).send(error)
        }
            //     User.find({
        // //        name : 'chary'
        //     }).then((users)=>{
        //         console.log(users);
        //         res.send(users).status(200)
                
        //     }).catch((error)=>{
        //         res.send(error).status(500)
        //     })
        })
    
// router.get('/users/:id',(req,res)=>{
//         console.log(req.params);
//         const _id = req.params.id
//         User.findById(_id).then((user)=>{
//             if(!user){
//                 return res.status(404).send()
//             }
//             res.send(user)
    
//         }).catch((error)=>{
//         res.status(500).send()
//         })
//     //    res.send(200)
//     })
    
    
router.patch('/users/me',auth,async (req,res)=>{


    const updates = Object.keys(req.body)   
    
    console.log("\n req.body : "+updates);
    
    const allowedupdates = ["name","email","password","age"]
    const isValidOperation = updates.every(
        (update)=>{
            return allowedupdates.includes(update)
        })
    if(!isValidOperation){
        return res.status(400).send({error:"invalid updates"})
    }
    try {
        //const user = await User.findById(req.param.id)

        updates.forEach((update)=>req.user[update] = req.body[update])
        
        await req.user.save()

        return res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }

});
 


// router.patch('/users/:id',auth,async (req,res)=>{
//     const updates = Object.keys(req.body)      
//     const allowedupdates = ["name","email","password","age"]
//     const isValidOperation = updates.every(
//         (update)=>{
//             return allowedupdates.includes(update)
//         })
//     if(!isValidOperation){
//         return res.status(400).send({error:"invalid updates"})
//     }
//     try {
//         const user = await User.findById(req.param.id)

//         updates.forEach((update)=>user[update] = req.body[update])
//         await user.save()
//         //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new : true,runValidators: true})
//         console.log(user);
//         if(!user){
//             return res.status(404).send('no users')

//         }
//         res.status(200).send(user)
//     } catch (error) {
//         res.status(404).send(error)
//     }
//     // user.save().then((user)=>{
//     //         console.log(user);
//     //         res.status(201)
//     //         res.send(user)
            
//     //     }
//     // ).catch((error)=>{
//     //     res.status(400)

//     //     res.send(error)
//     // })
// });
 





router.delete('/users/me',auth,async(req,res)=>{
//router.delete('/users/:id',auth,async(req,res)=>{
    
    try {
//      const user = await User.findByIdAndDelete(req.params.id)
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send({error : "not found"})
        // }
        await req.user.remove()

        res.status(200).send(req.user)
        //res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }

})



module.exports = router
