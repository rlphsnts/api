const express = require("express");
const productController = require("../controllers/productController");
const auth = require("../auth")
const {verify, verifyAdmin} = auth

/* Routing Component */
const router = express.Router()

/* Product Registration */
router.post("/", verify, verifyAdmin, productController.regProd)

/* Retrieve All Products */
router.get("/list", productController.listProd)

/* Retrieve All Active Products */
router.get("/list/status", verify, verifyAdmin, productController.statusProd)

/* Retrieve Single Product */
router.get("/", productController.getProd)

/* Update Product (Admin Only) */
router.put("/list/:id", verify, verifyAdmin, productController.updProd)

/* Archive Product */
router.put("/archive", verify, verifyAdmin, productController.archiveProd)

/* Activate Product */
router.put("/activate", verify, verifyAdmin, productController.activateProd)

module.exports = router