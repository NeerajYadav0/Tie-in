const router = require("express").Router();
const {studentLogin}=  require("../controllers/student");
const {employerLogin}= require("../controllers/employer")
const {professionalLogin}= require("../controllers/professional")


router.post("/student", studentLogin);
router.post("/employer", employerLogin);
router.post("/professional", professionalLogin);


module.exports = router;