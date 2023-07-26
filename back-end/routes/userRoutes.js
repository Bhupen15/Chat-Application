const express = require('express');
const { registerUSer } = require('../controllers/userControllers');

const router = express.Router();

router.route("/").post(registerUSer);
router.post('/login', authUser);

module.exports = router;