const router = require("express").Router();
const {removeAppliedJob,applyForJob,viewAppliedJob}= require("../controllers/job")

router.post("/applyForJob",applyForJob);
router.post("/removeAppliedJob",removeAppliedJob);
router.get("/viewAppliedJob",viewAppliedJob);

module.exports = router;
