const express = require("express");
const router = express.Router();
const { validatorLogin, validatorRegister } = require("../validators/auth");
const { RegisterCtrl, loginCtrl } = require("../controllers/auth");

//crea los items
router.post("/register", validatorRegister, RegisterCtrl);
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;
