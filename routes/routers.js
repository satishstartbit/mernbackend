const express = require("express")
const router = express.Router();


const product = require("../controllers/product")
const profile = require("../controllers/profile")
const dashboard = require("../controllers/Dashboard")
const user = require("../controllers/user")


router.get("/", dashboard.dashboard)
router.get("/addproduct", product.addproduct)
router.post("/addproduct", product.addproduct)
router.get("/profile", profile.profile)
router.post("/profile", profile.profile)
router.post("/registeruser", user.registeruser)
router.delete("/delete", product.deleteproduct)
router.post("/login", user.loginuser)
exports.router = router