const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks',auth, async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner : req.user._id

    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


//tasks?completed=true
//tasks?limt=10&skip=20
//tasks?sortBy=createdAt:asc/desc


router.get('/tasks',auth, async (req, res) => {
    const match = {}
    if(req.query.completed){
        match.completed = req.query.completed === true

    }


    const sort= {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 
    }
    try {
        //const task = await Task.find({})
        //const task = await Task.findOne({owner : req.user._id})
        //await req.user.populate('tasks').execPopulate()
        await req.user.populate({path :'tasks', match,
                                //  : {
                                //     completed : true
                                // }     
                                options : {           
                                //limit :2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                limit: parseInt(req.query.limit),
                                skip : parseInt(req.query.skip),
                                sort
                                // sort : {
                                //     createdAt : -1
                                // }
                            }             
    }).execPopulate()

        res.send(req.user.tasks)
        
        //res.send(task)
    } catch (e) {
        res.status(500).send()
    }

    //     Tasks.find({
// //        name : 'chary'
//     }).then((tasks)=>{
//         console.log(tasks);
//         res.send(tasks).status(200)
        
//     }).catch((error)=>{
//         res.send(error).status(500)
//     })
})

router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id

    try {
//        const task = await Task.findById(_id)
        const task = await Task.findOne({_id,owner : req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})




router.patch('/tasks/:id',auth,async(req,res)=>{
    console.log(req.params);
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        //const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id : req.params.id,owner : req.user._id})

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task) {
        return res.status(404).send('no tasks')
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()    
    }   
    res.send(task).status(200)
    console.log(task);
    } catch (error) {
        res.status(404).send(error)
    }


})


router.delete('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id 
    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id,owner : req.user._id})
        
        if(!task){
            return res.status(404).send({"error" : "not found"})
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }

})

module.exports = router
