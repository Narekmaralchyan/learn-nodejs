import express from 'express'
import mongoose from "mongoose";

const usersRouter = express.Router();

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
})

const UserModel =  mongoose.model('User',UserSchema)

usersRouter.post('/user',async (req, res) => {
    try {

        const user = new UserModel();
        await user.save();
        res.send('user added')
    }catch (e){
        // @ts-ignore
        console.log(e)
        // @ts-ignore
        res.send(e)
    }

})


export default usersRouter;

