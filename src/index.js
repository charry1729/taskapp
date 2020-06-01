const express=require('express');
//const multer = require("multer")

require('./db/mongoose')
const userRouter = require('../src/routers/user')
const taskRouter = require('../src/routers/task')
const authRouter =  require('./middleware/auth')
const app= express();



//const { ObjectID } = require('mongodb')

const port = process.env.PORT //|| 3027



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(authRouter)

//const router = new express.Router()
//app.user(router)

app.listen(port,()=>{
    console.log("connected to the server and port is "+port);
    
});


//var upload = multer({ dest: 'uploads/' })
//var upload = multer({ dest: 'avatars/' })


// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send();
// })




// const myfy = async ()=>{
//     const password = 'chary'
//     const hash = await bcrypt.hash(password,8)
//     console.log(hash);
//     const isMatch =  await bcrypt.compare(password,hash)
//     console.log(isMatch);
    
// }
// myfy()

// const jwt = require('jsonwebtoken');

// const newfun = async ()=>{
//     const token = jwt.sign({id:'abc123'},'thisisatokensecret',{expiresIn:'7 days'})
//     console.log(token)


//     const data = jwt.verify(token,'thisisatokensecret')
//      console.log("data   :"+data);

// }
// newfun()

//module.exports=app

// const User = require('./models/user')
// const Task = require('./models/task')
// const ownerdata = async()=>{
//     // const task = await Task.findById('5ecf4b5d74abce3f9a019040')
//     // await task.populate('owner').execPopulate()

//     // console.log("Owner : "+task.owner);
//     const user = await User.findById('5ecf4aab4b9ca73f8bdb32a6')
//     console.log(user);
//     await user.populate('tasks').execPopulate()
//     console.log("++++++");
    
//     console.log(user.tasks);


// }   

//ownerdata()


