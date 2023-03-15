const router = require("express").Router();
const {removeAppliedInternship,applyForInternship}= require("../controllers/internship")

router.post("/applyForInternship",applyForInternship);
router.post("/removeAppliedInternship",removeAppliedInternship);

module.exports = router;
