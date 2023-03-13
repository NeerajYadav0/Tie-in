const router = require("express").Router();
const {studentRegister}= require("../controllers/student");
const {employerRegister}= require("../controllers/employer");
const {professionalRegister}= require("../controllers/professional");



router.post("/student",studentRegister)
router.post("/employer",employerRegister)
router.post("/professional",professionalRegister)

module.exports = router;