const Job= require("../models/Job");
const Employer = require("../models/Employer")
const Student = require("../models/Student")
const Professional = require("../models/Professional")

const createJob=async (req,res)=>{
    try {
        const {instituteName,
            domain,
            expirationDate,
            salary,openings,
            jobDescription,
            selectionDescription,
            requirement,
            userId,
            companyLogo}= req.body;
        const status="open";
        const newJob= await new Job({
            instituteName,
            domain,
            expirationDate,
            salary,openings,
            jobDescription,
            selectionDescription,
            requirement,
            userId,
            companyLogo,
            status
        })
        const data = await newJob.save();
        const employer = await Employer.findOneAndUpdate({email:userId}, { $push: { job: data._id }});
        console.log(data,employer);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)   
    }
}

const getJob=(req,res)=>{
    try {
        const id = req.params.id;
        const job = Job.findById(id);
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json(error.message)   
    }
}
const getAllJobs=(req,res)=>{
    try {
        const job = Job.find()
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json(error.message)   
    }
}

const updateJob=async (req,res)=>{
    try {
        const {id,
            instituteName,
            domain,
            expirationDate,
            salary,openings,
            jobDescription,
            selectionDescription,
            requirement,
            companyLogo,status}= req.body;
            
       
        await Job.findByIdAndUpdate(id, { $set: {instituteName,
            domain,
            expirationDate,
            salary,openings,
            jobDescription,
            selectionDescription,
            requirement,
            companyLogo,
            status }});
            const jobData =await Job.findById(id);
        res.status(200).json(jobData)
    } catch (error) {
        res.status(500).json(error.message)   
    }
}

const applyForJob= async(req,res)=>{
    try {
       const {id, userId, resume, resumeLink, userType}= req.body;
       interestedObj={userId, resume, resumeLink, userType}
       await Job.findByIdAndUpdate(id,{ $push: { interested: interestedObj }})
       const data =await Job.findById(id);
       if(userType==="student")
       {
        const studentObj={id,status:"applied"};
        await Student.findOneAndUpdate({email:userId},{ $push: { job: studentObj }});
       }
       else if(userType==="professional")
       {
        const professionalObj={id,status:"applied"};
         await Professional.findOneAndUpdate({email:userId},{ $push: { job: professionalObj }});
       }
       res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)   
    }
}

const removeAppliedJob= async(req,res)=>{
try {
    const {id, userId,userType}= req.body;
    var jobData= await Job.findById(id);
    for(var i =0;i<jobData.interested.length;i++)
    {
        if(jobData.interested[i].userId===userId)
        {
            const data = jobData.interested[i];
            await Job.findByIdAndUpdate(id,{ $pull: { interested: data }});
        }
    }
    if(userType==="student")
    {
        const studentData= await Student.findOne({email:userId});
    for(var i =0;i<studentData.job.length;i++)
    {
        if(studentData.job[i].id===id)
        {
            const data = studentData.job[i];
            await Student.findOneAndUpdate({email:userId},{ $pull: { job: data }});
        }
    }

    }
    else if(userType==="professional")
    {
        const professionalData =await Professional.findOne({email:userId})
        for( var i=0;i<professionalData.job.length;i++)
        { 
            if(professionalData.job[i].id===id){
                const data=professionalData.job[i];
                await Professional.findOneAndUpdate({email:userId},{$pull:{job:data}});
            }

        }
    }
     jobData= await Job.findById(id);
     res.status(200).json(jobData);
} catch (error) {
    res.status(500).json(error.message)   
}
}

const updateAppliedStatus= async(req,res)=>{
    // console.log("entered")
    const {id, userId, status, userType} = req.body;
    console.log(userType);
    if(userType==="student"){
        // console.log("in if");
    const studentData = await Student.findOne({email:userId});
    for(var i=0;i<studentData.job.length;i++){
        if(studentData.job[i].id===id){
            var data=studentData.job[i];
            await Student.findOneAndUpdate({email:userId},{$pull:{job:data}});
            data.status=status;
            await Student.findOneAndUpdate({email:userId},{$push:{job:data}});
           

            res.status(200).json(data);

        }
    }
}
        else if(userType==="professional"){
            const professionalData=await Professional.findOne({email:userId});
    for(var i=0;i<professionalData.job.length;i++){
        if(professionalData.job[i].id===id){
            var data=professionalData.job[i];
            await Professional.findOneAndUpdate({email:userId},{$pull:{job:data}});
            data.status=status;
            await Professional.findOneAndUpdate({email:userId},{$push:{job:data}});
            // var data=studentData.job[i];
            // data.status=status;
            // const resObj=Student.findOneAndUpdate({email:userId},{$set: { 'job.i': data }},{ new: true});
            res.status(200).json(data);

        }
    }
}
}


module.exports= {createJob,updateJob,removeAppliedJob,applyForJob,updateAppliedStatus};