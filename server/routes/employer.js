const router = require("express").Router();
// const {createJob}= require("../controllers/employer")
const {createJob,updateJob,updateAppliedStatus,viewCreatedJob,}= require("../controllers/job")
const {createInternship,updateInternship,updateAppliedStatusIn,viewCreatedInternship}= require("../controllers/internship")
const {createHackathon,updateHackathon,updateAppliedStatusHack}= require("../controllers/hackathon")

router.get("/",(req,res)=>{
    res.send("req recived");
});

router.post("/createJob",createJob);
router.post("/updateJob",updateJob);
router.post("/createHackathon",createHackathon);
router.post("/updateHackathon",updateHackathon);
router.post("/createInternship",createInternship);
router.post("/updateInternship",updateInternship);
router.post("/updateAppliedStatus",updateAppliedStatus);
router.post("/updateAppliedStatusIn",updateAppliedStatusIn);
router.post("/updateAppliedStatusHack",updateAppliedStatusHack);
router.get("/viewCreatedJob",viewCreatedJob);
router.get("/viewCreatedInternship",viewCreatedInternship);





module.exports = router;