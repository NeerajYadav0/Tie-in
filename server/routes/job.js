const router = require("express").Router();
const {removeAppliedJob,applyForjob}= require("../controllers/job")

router.post("/applyForJob",applyForjob);
router.post("/removeAppliedJob",removeAppliedJob);

module.exports = router;
