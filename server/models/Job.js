const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        instituteName:{
            type:String,
            required:true,
        },
        domain:{
            type:String,
            required:true,
        },
        expirationDate:{
            type:String,
            required:true,
        },
        salary:{
            type:Number,
            required:true,
        },
        openings:{
            type:Number,
            required:true,
        },
        jobDescription:{
            type:String,
            required:true,
        },
        selectionDescription:{
            type:String,
            required:true,
        },
        requirement:{
            type:String,
            required:true,
        },
        userId:{
            type:String,
            required:true,
        },
        interested:{
            type:Object,
            default:{}
        },
        status:{
            type:String,
            required:true,
        },
        companyLogo:{
            type:String,
            required:true,
        },
    },
    { timestamps: true }
    );

module.exports = mongoose.model("Job", JobSchema);