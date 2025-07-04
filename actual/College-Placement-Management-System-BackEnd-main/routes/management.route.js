const express = require('express');

// router after /api/v1/management/
const router = express.Router();

const authenticateToken = require('../middleware/auth.middleware');


// management login controller
const Login = require('../controllers/Management/login.controller');
// management UsersTPO controller
const UsersTPO = require('../controllers/Management/tpo-users.controller');
// management DeleteTPO controller
const DeleteTPO = require('../controllers/Management/delete-tpo.controller');
// management AddTPO controller
const { AddTPO, AddManagement, AddStudent } = require('../controllers/Management/add-user.controller');

// all notice related here
const { SendNotice, GetAllNotice, DeleteNotice, GetNotice } = require('../controllers/Management/notice.controller');




router.post('/login', Login);

router.get('/tpo-users', authenticateToken, UsersTPO);

router.post('/deletetpo', authenticateToken, DeleteTPO);

// add management, tpo and student
router.post('/addtpo', authenticateToken, AddTPO);
router.post('/add-management', authenticateToken, AddManagement);
router.post('/add-student', authenticateToken, AddStudent);

// notices all route here 
router.post('/send-notice', SendNotice);

router.get('/get-all-notices', GetAllNotice);

router.get('/get-notice', GetNotice);

router.post('/delete-notice', DeleteNotice);


module.exports = router;