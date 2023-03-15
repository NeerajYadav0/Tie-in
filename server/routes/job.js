const router = require("express").Router();
const {removeAppliedJob,applyForJob}= require("../controllers/job")

router.post("/applyForJob",applyForJob);
router.post("/removeAppliedJob",removeAppliedJob);

module.exports = router;
