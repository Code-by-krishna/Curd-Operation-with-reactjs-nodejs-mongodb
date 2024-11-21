const express = require('express');
const router = express.Router();
const authanticateUser = require('../Controller/auth.controller');

router.post('/signup',authanticateUser.registration);
router.post('/login',authanticateUser.login);
router.get('/users',authanticateUser.activeUsers);
router.put('/delete/:id',authanticateUser.deleteUser);


module.exports = router;