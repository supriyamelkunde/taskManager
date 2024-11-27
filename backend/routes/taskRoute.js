const express = require('express');
const task = require('../models/task');

const router = express.Router();

router.get('/', async(req,res)=>{
    try{
        const tasks = await task.find().limit(10);
        res.json(tasks);
    }catch(error){
        res.status(500).json({message: error})
    }
})

router.post('/', async(req,res)=>{
    const {title, description, deadline, priority}= req.body;
    const task = new task({title, description, deadline, priority});

    try{
        const newTask = await task.save();
        res.status(201).json(newTask);
    }catch(error){
        res.status(400),json({message: error.message})
    }

});

router.put('/:id', async(req,res)=>{
    try{
        const task = await task.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(task);
    }catch(error){
        res.status(400),json({message: error.message})
    }
});

router.delete('/:id', async(req,res)=>{
    try{
        await task.findByIdAndDelete(req.params.id);
        res.json({message:'Task deleted'})
    }catch{
        res.status(400),json({message: error.message})
    }
});

module.exports = router;