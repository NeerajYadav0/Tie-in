const Hackathon = require("../models/Hackathon");
const Employer = require("../models/Employer");
const Student = require("../models/Student");
const Professional = require("../models/Professional");

const createHackathon = async (req, res) => {
  try {
    const {
      userId,
      domain,
      state,
      district,
      mode,
      rounds,
      description,
      prizeDescription,
      name,
      projectDomains,
      startDate,
      endDate,
      lastDate,
      logo,
      instituteName,
      teamSize,
      prize,
    } = req.body;
    const status = "open";
    const newHack = await new Hackathon({
      userId,
      domain,
      state,
      district,
      mode,
      rounds,
      description,
      prizeDescription,
      name,
      projectDomains,
      startDate,
      endDate,
      lastDate,
      logo,
      instituteName,
      teamSize,
      prize,
      status,
    });
    const data = await newHack.save();
    const employer = await Employer.findOneAndUpdate(
      { email: userId },
      { $push: { hackathon: data._id } }
    );
    console.log(data, employer);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getHackathon = (req, res) => {
  try {
    const id = req.params.id;
    const hackathon = Hackathon.findById(id);
    res.status(200).json(hacakthon);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getAllHackathon = (req, res) => {
  try {
    const hackathon = Hackathon.find();
    res.status(200).json(hackathon);
  } catch (error) {
    res.ststus(500).json(error.message);
  }
};

const updateHackathon = async (req, res) => {
  try {
    const {
      id,
      domain,
      state,
      district,
      mode,
      rounds,
      description,
      prizeDescription,
      name,
      projectDomains,
      startDate,
      endDate,
      lastDate,
      status,
      logo,
      instituteName,
      teamSize,
      prize,
      interested,
    } = req.body;

    await Hackathon.findByIdAndUpdate(id, {
      $set: {
        domain,
        state,
        district,
        mode,
        rounds,
        description,
        prizeDescription,
        name,
        projectDomains,
        startDate,
        endDate,
        lastDate,
        status,
        logo,
        instituteName,
        teamSize,
        prize,
        interested,
      },
    });
    const hackathonData = await Hackathon.findById(id);
    res.status(200).json(hackathonData);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const applyForHackathon = async (req, res) => {
  try {
    const { id, userId, teamName, projectDomain, projectPitch, teamSize,userType } =
      req.body;
    interestedObj = { userId, teamName, projectDomain, projectPitch, teamSize };
    await Hackathon.findByIdAndUpdate(id, {
      $push: { interested: interestedObj },
    });
    const data = await Hackathon.findById(id);

    if (userType === "student") {
      const studentObj = { id, status: "applied" };
      await Student.findOneAndUpdate(
        { email: userId },
        { $push: { hackathon: studentObj } }
      );
    } else if (userType === "professional") {
      const professionalObj = { id, status: "applied" };
      await Professional.findOneAndUpdate(
        { email: userId },
        { $push: { hackathon: professionalObj } }
      );
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const removeAppliedHackathon = async (req, res) => {
  try {
    const { id, userId, userType } = req.body;
    var hackathonData = await Hackathon.findById(id);
    for (var i = 0; i < hackathonData.interested.length; i++) {
      if (hackathonData.interested[i].userId === userId) {
        const data = hackathonData.interested[i];
        await Hackathon.findByIdAndUpdate(id, { $pull: { interested: data } });
      }
    }

    if (userType === "student") {
      const studentData = await Student.findOne({ email: userId });
      for (var i = 0; i < studentData.hackathon.length; i++) {
        if (studentData.hackathon[i].id === id) {
          const data = studentData.hackathon[i];
          await Student.findOneAndUpdate(
            { email: userId },
            { $pull: { hackathon: data } }
          );
        }
      }
    } else if (userType === "professional") {
      for (var i = 0; i < professionalData.hackathon.length; i++) {
        if (professionalData.hackathon[i].id === id) {
          const data = professionalData.hackathon[i];
          await Professional.findOneAndUpdate(
            { email: userId },
            { $pull: { hackathon: data } }
          );
        }
      }
    }
    hackathonData = await Hackathon.findById(id);
    res.status(200).json(hackathonData);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateAppliedStatusHack = async (req, res) => {
  try {
    const { id, userId, status, userType } = req.body;
    console.log(userType);
    if (userType === "student") {
      const studentData = await Student.findOne({ email: userId });
      for (var i = 0; i < studentData.hackathon.length; i++) {
        if (studentData.hackathon[i].id === id) {
          var data = studentData.hackathon[i];
          await Student.findOneAndUpdate(
            { email: userId },
            { $pull: { hackathon: data } }
          );
          data.status = status;
          await Student.findOneAndUpdate(
            { email: userId },
            { $push: { hackathon: data } }
          );

          res.status(200).json(data);
        }
      }
    } else if (userType === "professional") {
      const professionalData = await Professional.findOne({ email: userId });
      for (var i = 0; i < professionalData.hackathon.length; i++) {
        if (professionalData.hackathon[i].id === id) {
          var data = professionalData.hackathon[i];
          await Professional.findOneAndUpdate(
            { email: userId },
            { $pull: { hackathon: data } }
          );
          data.status = status;
          await Professional.findOneAndUpdate(
            { email: userId },
            { $push: { hackathon: data } }
          );

          res.status(200).json(data);
        }
      }
    }else{
        res.status(300).json("data not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  createHackathon,
  updateHackathon,
  removeAppliedHackathon,
  applyForHackathon,
  updateAppliedStatusHack,
  updateHackathon,
  getAllHackathon,
  getHackathon,
};
