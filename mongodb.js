// const mongodb =  require("mongodb")

// //const {MongoClient , ObjectID } =  =  require("mongodb")


// const MongoClient = mongodb.MongoClient

// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'
// const ObjectID = mongodb.ObjectID
// // const id = new ObjectID()
// // console.log(id);

// // console.log(id.id.length);
// // console.log(id.toHexString().length);

// // console.log(id.getTimestamp());


// MongoClient.connect(connectionURL,{useNewUrlParser: true},(error,client)=>{

//     if(error){
//         return console.log('unable to connect to db');
        
//     }
//     console.log("connected to mongodb");
    
//     const db = client.db(databaseName)

//     db.collection('tasks').deleteOne({
//         _id : new ObjectID("5ec64a88de2ebd4bb047fef8")
//     }).then((result)=>{
//             console.log(result);
//             }
//         ).catch((error)=>{
//             console.log(error);
//         }
//         )


//     // db.collection('users').deleteMany({age : 31 }).then((result)=>{
//     //             console.log(result);
//     //             }
//     //         ).catch((error)=>{
//     //             console.log(error);
//     //         })

//     // db.collection('tasks').updateMany(
//     //     {completed : false},
//     //     {
//     //         $set : {
//     //             completed : true
//     //         }
//     //     }
//     //     ).then((result)=>{
//     //         console.log(result.modifiedCount);
//     //         }
//     //     ).catch((error)=>{
//     //         console.log(error);
//     //     }
//     //     )



//     // db.collection('users').updateOne({
//     //     _id : new ObjectID("5ec6744bede72471700e7ea8")
//     // },{
//     //     $inc : {
//     //         age : 35
//     //     }
//     // }).then((result)=>{console.log(result);
//     // }).catch((error)=>{console.log(error);
//     // });




// });


//     // db.collection('tasks').updateOne({_id : new ObjectID("5ec64a88de2ebd4bb047fef8")},
//     // {
//     //      $set : {
//     //          completed:true
//     //      }
//     // }).then((result)=>{
//     //     console.log(result);
        
//     // }).catch(
//     // (error)=>{
//     //     console.log(error);
        
//     // })
//     // });




// //     db.collection('users').findOne({_id: new ObjectID("5ec6744bede72471700e7ea8")},(error,user)=>{

// //         if(error){
// //             console.log(error);
            
// //         }
// //     console.log(user);

// // });

// // db.collection('users').find({age : 31}).toArray((error,user)=>{
// //     console.log(user);
    
// // })
// // db.collection('users').find({age : 31}).count((error,count)=>{
// //     console.log(count);
    
// // })

// // db.collection('tasks').findOne({_id : new ObjectID("5ec64ac74884334bdf3877f6") },(error,task)=>{
// //     console.log(task);
    
// // })

// // db.collection('tasks').find({completed : false }).toArray((error,task)=>{
// //     console.log(task);
    
// // })
// //     // db.collection('users').insertOne({
//     //     _id : id,
//     //     name : 'vikaram',
//     //     age: 31
//     // },(error,result)=>{
//     //     if (error) {
//     //         return console.log('unable to insert user');
            
//     //     }
//     //     console.log(result.ops);
        

//     // })

//     // db.collection('users').insertMany([{
//     //     name:'harika',
//     //     age:23
//     // },{
//     //     name:'sasya',
//     //     age:36
//     // }],(error,result)=>    {
//     //     if(error){
//     //         return console.log('insertion error');
            
//     //     }
//     // console.log(result.ops);

        

//     // })

// //     db.collection('tasks').insertMany([{
// //         description : 'task1',
// //         completed : true
// //     },{       
// //         description : 'task2',
// //         completed : false
// //     },{       
// //         description : 'task3',
// //         completed : false
// //     }],(error,result)=>{
// //         if(error){
// //             return console.log('insert success');
            
// //         }
// //         console.log(result.ops);
        
// //    })






