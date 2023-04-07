const router = require("express").Router();
const {removeAppliedInternship,applyForInternship,viewAppliedInternship}= require("../controllers/internship")

router.post("/applyForInternship",applyForInternship);
router.post("/removeAppliedInternship",removeAppliedInternship);
router.get("/viewAppliedInternship",viewAppliedInternship);

module.exports = router;
