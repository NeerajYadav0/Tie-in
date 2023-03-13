const Student = require("../models/Student");
const bcrypt = require("bcrypt")

const studentRegister= async(req,res)=>{
    const {name,
        email,
        phoneNo,
        state,
        district,
        institute,
        qualification,
        description,
        profile,
        degree,
        currentYear,
        from,
        to,
        achivements,
        password}= req.body;

        try {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt)
            const student = new Student({name,
            email,
            phoneNo,
            state,
            district,
            institute,
            qualification,
            description,
            profile,
            degree,
            currentYear,
            from,
            to,
            achivements,
            password: hashPassword

            });
            const data = await student.save();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error.message)
        }
}

const studentLogin= async(req,res)=>{
    const {email, password}= req.body;
    try {
        const student = await Student.findOne({email});
        if(!student)
        {
            res.status(404).json("wrong email")
            
        }
        console.log(student, password)
        const isMatch = await bcrypt.compare(password, student.password);
        if(isMatch){
            res.status(200).json(student)
        }else{
            res.status(404).json("wrong password")
        }

    } catch (error) {
        res.status(500).json(error.message) 
    }
}

module.exports= {studentRegister,studentLogin};
