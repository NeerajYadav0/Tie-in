const mongoose = require("mongoose");

const HackathonSchema = new mongoose.Schema(
    {
        userId:{
        type: String,
        required: true,
        },
        domain:{
            type:String,
            required: true,
        },
        state:{
            type:String,
            required:true,
        },
        district:{
            type:String,
            required:true,
        },
        mode:{
            type:String,
            required:true,
        },
        rounds:{
            type:Number,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        prizeDescription:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        projectDomains:{
            type:String,
            required:true,
        },
        startDate:{
            type:String,
            required:true,
        },
        endDate:{
            type:String,
            required:true,
        },
        lastDate:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            required:true,
        },
        logo:{
            type:String,
            required:true,
        },
        instituteName:{
            type:String,
            required:true,
        },
        teamSize:{
            type:Number,
            required:true,
            min:1
        },
        prize:{
            type:Number,
            required:true,
        },
        interested:{
            type:Object,
            default:{}
        },

    },
    { timestamps: true }
    );

module.exports = mongoose.model("Hackathon", HackathonSchema);