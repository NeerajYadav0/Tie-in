const router = require("express").Router();
const {removeAppliedHackathon,applyForHackathon,getHackathon,getAllHackathon,updateAppliedStatusHack}= require("../controllers/hackathon")

router.post("/applyForHackathon",applyForHackathon);
router.post("/removeAppliedHackathon",removeAppliedHackathon);
router.post("/removeAppliedHackathon",removeAppliedHackathon);
router.post("/updateAppliedStatusHack",updateAppliedStatusHack);
router.get("/getHackathon",getHackathon);
router.get("/getAllHackathon",getAllHackathon);

module.exports = router;
