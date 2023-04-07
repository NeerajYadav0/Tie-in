const Internship = require("../models/Internship");
const Employer = require("../models/Employer");
const Student = require("../models/Student");
const Professional = require("../models/Professional");

//create internship
const createInternship = async (req, res) => {
  try {
    const {
      userId,
      duration,
      stypend,
      requirement,
      mode,
      description,
      instituteName,
      workingHours,
      openings,
      companyLogo,
    } = req.body;
    const status = "open";
    const newInternship = await new Internship({
      userId,
      duration,
      stypend,
      requirement,
      mode,
      description,
      instituteName,
      workingHours,
      openings,
      companyLogo,
      status,
    });
    const data = await newInternship.save();
    const employer = await Employer.findOneAndUpdate(
      { email: userId },
      { $push: { internship: data._id } }
    );
    console.log(data, employer);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//get a specific intership
const getInternship = (req, res) => {
  try {
    const id = req.params.id;
    const internship = Internship.findById(id);
    res.status(200).json(internship);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get all intership
const getAllInternship = (req, res) => {
  try {
    const internship = Internship.find();
    res.status(200).json(internship);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//update an internship
const updateInternship = async (req, res) => {
  try {
    const {
      duration,
      stypend,
      requirement,
      mode,
      description,
      instituteName,
      workingHours,
      openings,
      companyLogo,
      status,
      id,
    } = req.body;

    const internshipData = await Internship.findByIdAndUpdate(
      id,
      {
        $set: {
          duration,
          stypend,
          requirement,
          mode,
          description,
          instituteName,
          workingHours,
          openings,
          companyLogo,
          status,
        },
      },
      { new: true }
    );
    res.status(200).json(internshipData);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//apply for internship

const applyForInternship = async (req, res) => {
  try {
    const { id, userId, resume, resumeLink, userType } = req.body;
    interestedObj = { userId, resume, resumeLink, userType };
    const data = await Internship.findByIdAndUpdate(
      id,
      { $push: { interested: interestedObj } },
      { new: true }
    );
    //    const data =await Internship.findById(id);
    if (userType === "student") {
      const studentObj = { id, status: "applied" };
      await Student.findOneAndUpdate(
        { email: userId },
        { $push: { internship: studentObj } }
      );
    } else if (userType === "professional") {
      const professionalObj = { id, status: "applied" };
      await Professional.findOneAndUpdate(
        { email: userId },
        { $push: { internship: professionalObj } }
      );
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//remove applied internship

const removeAppliedInternship = async (req, res) => {
  try {
    const { id, userId, userType } = req.body;
    var internshipData = await Internship.findById(id);
    for (var i = 0; i < internshipData.interested.length; i++) {
      if (internshipData.interested[i].userId === userId) {
        const data = internshipData.interested[i];
        await Internship.findByIdAndUpdate(id, { $pull: { interested: data } });
      }
    }
    if (userType === "student") {
      const studentData = await Student.findOne({ email: userId });
      for (var i = 0; i < studentData.internship.length; i++) {
        if (studentData.internship[i].id === id) {
          const data = studentData.internship[i];
          await Student.findOneAndUpdate(
            { email: userId },
            { $pull: { internship: data } }
          );
        }
      }
    } else if (userType === "professional") {
      const professionalData = await Professional.findOne({ email: userId });
      for (var i = 0; i < professionalData.internship.length; i++) {
        if (professionalData.internship[i].id === id) {
          const data = professionalData.internship[i];
          await Professional.findOneAndUpdate(
            { email: userId },
            { $pull: { internship: data } }
          );
        }
      }
    }
    internshipData = await Internship.findById(id);
    res.status(200).json(internshipData);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//update status of internship

const updateAppliedStatusIn = async (req, res) => {
  try {
    const { id, userId, status, userType } = req.body;
    console.log(userType);
    if (userType === "student") {
      const studentData = await Student.findOne({ email: userId });
      for (var i = 0; i < studentData.internship.length; i++) {
        if (studentData.internship[i].id === id) {
          var data = studentData.internship[i];
          await Student.findOneAndUpdate(
            { email: userId },
            { $pull: { internship: data } }
          );
          data.status = status;
          await Student.findOneAndUpdate(
            { email: userId },
            { $push: { internship: data } }
          );

          res.status(200).json(data);
        }
      }
    } else if (userType === "professional") {
      const professionalData = await Professional.findOne({ email: userId });
      for (var i = 0; i < professionalData.internship.length; i++) {
        if (professionalData.internship[i].id === id) {
          var data = professionalData.job[i];
          await Professional.findOneAndUpdate(
            { email: userId },
            { $pull: { internship: data } }
          );
          data.status = status;
          await Professional.findOneAndUpdate(
            { email: userId },
            { $push: { internship: data } }
          );

          res.status(200).json(data);
        }
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// view applied internship
const viewAppliedInternship = async (req, res) => {
  try {
    const { userType, userId } = req.body;
    var data = [];
    if (userType === "student") {
      const student = await Student.findById(userId);
      for (let x of student.internship) {
        const internship = await Internship.findById(x.id);
        let result={"userStatus":x.status, ...internship._doc};
        
        delete result.interested;
        data.push(result);
      }
      res.status(200).json(data);
    } else {
      const professional = await Professional.findById(userId);
      for (let x of professional.internship) {
        const internship = await Internship.findById(x.id);
        internship.status = x.status;

        let result={"userStatus":x.status, ...internship._doc};
        
        delete result.interested;
        data.push(result);
      }
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const viewCreatedInternship = async () => {
  try {
    var data = [];
    const { userId } = req.body;
    const employer = await Employer.findById(userId);
    for (let x of employer.internship) {
      const internship = await Internship.findById(x);
      let result={"userStatus":x.status, ...internship._doc};
        
      delete result.interested;
      data.push(result);
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  removeAppliedInternship,
  applyForInternship,
  updateInternship,
  getAllInternship,
  getInternship,
  createInternship,
  updateAppliedStatusIn,
  viewAppliedInternship,
  viewCreatedInternship,
};
