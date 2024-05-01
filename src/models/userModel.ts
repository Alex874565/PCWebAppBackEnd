import { NextFunction } from "express";
import { Schema } from "mongoose";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    enum: [ 'Admin', 'Distributor', 'Client' ],
    type: String,
    required: true,
    default: 'Client'
  }
});

userSchema.pre('save', async function save(this: any, next : NextFunction) {
    if (!this.isModified('password')){ return next() }
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });
  
  userSchema.methods.validatePassword = async function validatePassword(data : string) {
    console.log('b')
    const res = await bcrypt.compare(data, this.password).then(function(err : any, res: any) {
      if (err != undefined){
        return err;
      }
      return res;
      });
    return res;
  };

const User = mongoose.model('User', userSchema);

export = { User }