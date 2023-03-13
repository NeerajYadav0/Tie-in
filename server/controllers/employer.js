const Employer = require("../models/Employer")
const bcrypt = require("bcrypt")
const Job= require("../models/Job")

const employerRegister=async(req,res)=>{
    const {name,
        email,
        phoneNo,
        state,
        district,
        institute,
        designation,
        description,
        qualification,
        profile,
        password}= req.body;
        try {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt)
            const employer = new Employer({name,
                email,
                phoneNo,
                state,
                district,
                institute,
                designation,
                description,
                qualification,
                profile,
                password: hashPassword

            });
            const data = await employer.save();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error.message)
        }
}

const employerLogin= async(req,res)=>{
    const {email, password}= req.body;
    try {
        const employer = await Employer.findOne({email});
        if(!employer)
        {
            res.status(404).json("wrong email")
            
        }
        console.log(employer, password)
        const isMatch = await bcrypt.compare(password, employer.password);
        if(isMatch){
            res.status(200).json(employer)
        }else{
            res.status(404).json("wrong password")
        }

    } catch (error) {
        res.status(500).json(error.message) 
    }
}

const employerDetails=(req,res)=>{
    try {
        const email = req.params.email;
        const employer = Employer.findOne({email});
        res.status(200).json(employer);
    } catch (error) {
        res.status(500).json(error.message)   
    }
}

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





module.exports= {employerRegister,employerLogin,employerDetails,createJob};