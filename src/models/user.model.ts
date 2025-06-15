import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"please provide username"],
        unique:true
    },
    email:{
        type: String,
        required: [true,"please provide email"],
        unique:true
    },
    password:{
        type: String,
        required: [true,"please provide password"],
        unique:true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:{
        type:String,
    },
    forgotPasswordTokenExpiry:{
        type:Date
    },
    verifyToken:String,
    verifyTokenExpiry:Date

})

export const User = mongoose.models.users || mongoose.model("users",userSchema);