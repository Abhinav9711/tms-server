const express = require('express');
const router = express.Router();

const { createUser, signInUser, createTask, updateTask, getTaskDetails
     } = require('../controller/userController');

router.route("/signup").post(createUser);
router.route('/signin').post(signInUser);
router.route('/create').post(createTask);
router.route('/update').put(updateTask);
router.route('/task').post(getTaskDetails);
module.exports = router