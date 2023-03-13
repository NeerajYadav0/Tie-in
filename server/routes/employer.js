const router = require("express").Router();
// const {createJob}= require("../controllers/employer")
const {createJob,updateJob}= require("../controllers/job")
router.get("/",(req,res)=>{
    res.send("req recived");
});

router.post("/createJob",createJob);
router.post("/updateJob",updateJob);



module.exports = router;