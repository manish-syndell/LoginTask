const express = require('express');
const { register, login, verify, getUserDetails, logout, verifyLink } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.post('/verify',verify);
router.get('/verifyLink',verifyLink);
router.get('/logout',logout);
router.get('/me',isAuthenticatedUser,authorizeRoles('admin','user','agent'),getUserDetails)



module.exports = router;