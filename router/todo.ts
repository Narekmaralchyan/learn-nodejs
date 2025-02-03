import express from 'express'
import mongoose from "mongoose";

const todosRouter = express.Router();

const TodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    completed:{
        type:Boolean,
        required:true
    }
})

const TodoModel =  mongoose.model('Todo',TodoSchema)

todosRouter.post('/todos',async (req, res) => {
    try {
        const {title,completed,description} = req.body;
        if (!title){
            res.status(400).json({message:'Title is required'})
        }

        const todo = new TodoModel({
            title:title,
            description:description,
            completed:false
        });
        await todo.save();
        res.status(200).json({ message: 'todo created', todo });
    }catch (e){
        res.send(e)
    }
})
todosRouter.put('/todos/:id',async (req,res)=>{
    try{
        const {title,completed,description} = req.body;
        const id =  req.params.id;

        if (!title){
            res.status(400).json({message:'Title is required'})
        }

        const updatedTodo = await TodoModel.findByIdAndUpdate(id,{
            title,
          ...((completed != undefined  ) && {completed}),
          ...((description != undefined ) && {description})
        })

        if (!updatedTodo){
             res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json({ message: 'todo updated', todo: updatedTodo });

    }catch (e) {
        res.send(e)
    }
})
todosRouter.patch('/todos/update-title',async (req,res)=>{
    try {
        const { id, title } = req.body;

        if (!id || !title) {
             res.status(400).json({ error: 'id and title are required' });
        }

        const updatedTodo = await TodoModel.findByIdAndUpdate(
            id,
            { title },
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
             res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json({ message: 'Title updated', todo: updatedTodo });
    }
    catch (e) {
        res.send(e)
    }
})
todosRouter.patch('/todos/update-status',async (req,res)=>{
    try {
        const { id, completed } = req.body;

        if (completed==undefined) {
            res.status(400).json({ error: ' "completed" are required' });
        }
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            id,
            { completed },
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json({ message: 'Title updated', todo: updatedTodo });
    }
    catch (e) {
        res.send(e)
    }
})
todosRouter.delete('/todos/:id',async (req,res)=>{
    try {
        const { id } = req.body;

        const deletedTodo = await TodoModel.findOneAndDelete(
            id,
        );

        if (!deletedTodo) {
            res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo deleted' });
    }
    catch (e) {
        res.send(e)
    }
})
todosRouter.get('/todos',async (req, res)=>{
    try {
       const todos =await TodoModel.find();
       res.status(200).json(todos)
    }
    catch (e) {
        res.send(e)
    }
})

export default todosRouter;