import {mongoose } from "mongoose";
//const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  location: {type: String, required: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  usertype: { type: Number, required: true,default: 0 },
});

export const spice = mongoose.model('UserRegistration',UserSchema);