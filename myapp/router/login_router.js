const express = require('express');
const login_controller = require ("../controller/login_controller");
const router = express.Router();

router.post ('/', login_controller.realizarLogin);

module.exports = router;