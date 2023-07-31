const express = require('express');
const { registerUSer, authUser, allUsers } = require('../controllers/userControllers');
const { protect } = require('../middilewares/authMiddileware');

const router = express.Router();

router.route("/").post(registerUSer).get(protect, allUsers);
router.post('/login', authUser);


module.exports = router;