const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        interested:{
            type:Object,
            default:{}
        },
        duration:{
            type:Number,
            required:true,
        },
        stypend:{
            type:Number,
            required:true,
        },
        requirement:{
            type:String,
            required:true,
        },
        mode:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        instituteName:{
            type:String,
            required:true,
        },
        workingHours:{
            type:Number,
            required:true,
        },
        openings:{
            type:Number,
            required:true,
        },
        status:{
            type:String,
            required:true,
        },
        companyLogo:{
            type:String,
            required:true,
        },

    }
    ,
  { timestamps: true });

module.exports = mongoose.model("Internship", InternshipSchema);