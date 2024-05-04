const UserModel = require('../models/userModel');
import { Request, Response } from 'express';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

async function getUsers (req : Request, res : Response){
  try {
    const users = await UserModel.User.find(req.query, 'name role _id');
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


async function createUser (req : Request, res : Response){
  const user = new UserModel.User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

async function updateUser(req : Request, res : Response){
    try{
        if (req.body.password){
          const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));
          req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const newUser = await UserModel.User.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.id), req.body, { new : true });
        res.status(200).json(newUser);
    } catch (err : any){
        res.status(400).json({message: err.message});
    }
    res.status(200)
}

async function deleteUser(req : Request, res : Response){
    try{
        const resp = await UserModel.User.findById(new mongoose.Types.ObjectId(req.body.id)).remove();
        res.status(200).json(resp);
    }catch(err : any){
        res.status(400).json({message : err.message});
    }
}

export = { getUsers, createUser, updateUser, deleteUser }