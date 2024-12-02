import mongoose from "mongoose";


const UserSchema =new mongoose.Schema({
    clerkId:String,
    wishList:{type:Array,default:[]},
    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date,default:Date.now()},
   

})


const UserModal =mongoose.models.User || mongoose.model("User",UserSchema);

export default UserModal;








