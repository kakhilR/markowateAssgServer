import { GenerateSecretToken } from "../middlewares/index.js";
import { UserModel } from "../models/User.js";

export const registerUser = async (req,res)=>{
    const { name, email, password} = req.body;
    try{
        if(!name || !email || !password){
            return res.status(400).send({ message: "fields can not be empty!" });
        }
        const findUser = await UserModel.findOne({ email: email});
        if(findUser){
            return res.status(400).send({success:false, message: "Failed! Username is already in use!" });
        }
        const user = new UserModel({name,email,password})
        const _user = await user.save();
        if(!_user) {
            return res.status(404).send({success:false,message:'failed'});
        }
        return res.status(200).send({success:true,message:'success', _user});
    }catch(error){
        return res.send({message:'internal error',error});
    }
    
}

export const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const existingUser = await UserModel.findOne({email: email});

        if(!existingUser){
            return res.status(400).send({success:false, message: "Failed! Username not found" });
        }
        if(existingUser.password===password){
            const token = await GenerateSecretToken({id:existingUser.id});
            return res.status(200).send({success:true,data:{id:existingUser.id,token},message:'success'})
        }else{
            return res.status(401).send({success:false,message:"please check you username or password"})
        }

    }catch(e){
        return res.send({message:'internal error',error});
    }
}


export const getUsers = async ( req,res)=>{
    try{
        const users = await UserModel.find({})
        return res.send(users)
    }catch(error){
        return res.send({message:'internal error',error});
    }
}


export const getUsersById = async ( req,res)=>{
    const id = req.params.id;
    try{
        const user = await UserModel.findById(id);
        if(!user){
            return res.status(404).send({success:false, message: "Not found user with id " + id });
        }
        return res.send(user)
    }catch(error){
        return res.send({message:'internal error',error});
    }
}

export const updateUser = async(req,res)=>{
    const id = req.params.id;
    try{
        const {name,email} = req.body;
        const findUser = await UserModel.findById(id);
        if(!findUser){
            return res.status(404).send({success:false, message: "Not found user with id " + id });
        }
        const update = await UserModel.findByIdAndUpdate(id,{name:name,email:email})
        return res.send({success:true, message: "user was updated successfully" });
    }catch(error){
        res.send({message:'internal error',error});
    }
}

export const deleteUser = async(req,res)=>{
    const id = req.params.id;
    try{
        const findUser = await UserModel.findById(id);
        if(!findUser){
            return res.status(404).send({success:false, message: "Not found user with id " + id });
        }
        const update = await UserModel.findByIdAndDelete(id)
        return res.send({success:false,message:"success"});
    }catch(error){
        return res.send({message:'internal error',error});
    }
}