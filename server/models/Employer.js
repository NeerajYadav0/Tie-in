const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        phoneNo:{
            type:Number,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        district:{
            type:String,
            required:true,
        },
        institute:{
            type:String,
            required:true,
        },
        designation:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        qualification:{
            type:String,
            required:true,
        },
        profile:{
            type:String,
            required:true,
        },
        job:{
            type:Object,
            default:{}
        },
        internship:{
            type:Object,
            default:{}
        },
        hackathon:{
            type:Object,
            default:{}
        },
        password:{
            type:String,
            required:true
        }
    },
    { timestamps: true }
    
    );

module.exports = mongoose.model("Employer", EmployerSchema);