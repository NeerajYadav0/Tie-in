const Professional= require("../models/Professional");
const bcrypt = require("bcrypt")

const professionalRegister= async(req,res)=>{
    const{
        name,
        email,
        phoneNo,
        state,
        district,
        institute,
        qualification,
        description,
        experience,
        profile,
        password,

    }=req.body
    
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)
        const professional=  new Professional({
            name,
            email,
            phoneNo,
            state,
            district,
            institute,
            qualification,
            description,
            experience,
            profile,
            password:hashPassword

        });
        const data=await professional.save();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }

    
    
}

const professionalLogin= async(req,res)=>{
    const{email,password}=req.body;
    try{
        const professional=await Professional.findOne({email});
        if(!professional){
            res.status(404).json("wrong email")
        }
        const isMatch=await bcrypt.compare(password,professional.password);
        if(isMatch){
            res.status(200).json(professional)
        } else{
            res.status(500).json("wrong password")
        }
    } catch (error){
        res.status(500).json(error.message)
    }

}
module.exports= {professionalRegister,professionalLogin};