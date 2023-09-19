const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../auth");
const {verify, verifyAdmin} = auth;

/* Routing Component */
const router = express.Router()

/* User Registration */
router.post("/registration", userController.regUser)

/* Get All Users */
router.get("/", userController.allUsers)

/* Retrieve Single User */
router.post("/", userController.sgUser)

/* User Login */
router.post("/login", userController.logUser)

/* Update Existing User to Admin */
router.put("/update/:id", verify, verifyAdmin, userController.userAdmin)

/* Admin role to User */
router.put("/role/:id", verify, verifyAdmin, userController.userRole)

/* Update User Information */
router.put("/user-update/:id", verify, userController.updUser)

/* Reset Password */
router.put("/reset-password", verify, userController.userReset)


/* Export Route System */
module.exports = router