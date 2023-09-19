const express = require("express");
const cartController = require("../controllers/cartController");
const auth = require("../auth")
const {verify, verifyAdmin} = auth

const router = express.Router()

router.post("/addcart", cartController.addCart)

module.exports = router