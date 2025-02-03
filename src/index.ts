import express from 'express';
import mongoose from "mongoose";
import router from "../router";
import todosRouter from "../router/todo";
import usersRouter from "../router/users";

const app = express();
app.use(express.static('public'))
app.use(express.json())

app.use(router);
app.use(todosRouter);
app.use(usersRouter);

mongoose.connect('mongodb://localhost:27017/todoDb').then(()=>{
    app.listen(5000,()=>{
        console.log('app started')
    })
})