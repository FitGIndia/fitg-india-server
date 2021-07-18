const express = require("express");
const router = express.Router();
const {getUserById} = require("../controllers/user")
const {getGymById, addGym} = require("../controllers/gym");


const {isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//params
router.param("userId", getUserById);
router.param("gymId", getGymById);

//Routes
// router.get("/gym/:gymId", isSignedIn, isAuthenticated, getGymById);

router.post("/gym/create/:userId", isSignedIn, isAuthenticated, isAdmin, addGym);



module.exports = router;