const router = require("express").Router();
// const {createJob}= require("../controllers/employer")
const {createJob,updateJob,updateAppliedStatus}= require("../controllers/job")
const {createInternship,updateInternship,updateAppliedStatusIn}= require("../controllers/internship")
router.get("/",(req,res)=>{
    res.send("req recived");
});

router.post("/createJob",createJob);
router.post("/updateJob",updateJob);
router.post("/createInternship",createInternship);
router.post("/updateInternship",updateInternship);
router.post("/updateAppliedStatus",updateAppliedStatus);
router.post("/updateAppliedStatusIn",updateAppliedStatusIn);




module.exports = router;