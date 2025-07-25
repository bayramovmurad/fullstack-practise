import mongoose from "mongoose";

const UserSchema  = new mongoose.Schema({
    username: {type:String, required: true, unique: false},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true, minlength: 6},
    role: { type: String, default: "user", enum: ['admin', 'user'] }
})


export const UserModel = mongoose.model("users", UserSchema)