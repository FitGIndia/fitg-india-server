const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  createRequest
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.post('/gymrequest', createRequest)
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;
