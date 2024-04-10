import { NextFunction } from "express";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

enum Role { Admin, Distributor, Client }

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
    type: Role,
    required: true,
    default: Role.Client
  }
});

userSchema.pre('save', async function save(this: any, next : NextFunction) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });
  
  userSchema.methods.validatePassword = async function validatePassword(data : string) {
    return bcrypt.compare(data, this.password);
  };
     

const User = mongoose.model('User', userSchema);

export = { User }