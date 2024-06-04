import mongoose from "mongoose";
//declaro el schema 
const userSchema = mongoose.Schema({
    _id: String,
    name: String,
})
//
const userModel = mongoose.model('User', userSchema);

export default userModel;