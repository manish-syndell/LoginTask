const express = require('express');
const { getAllPermissions, getRolePermissions, updatePermissions } = require('../controllers/permissionController');

const router = express.Router();



router.get('/permissions',getAllPermissions);
router.post('/permission/role',getRolePermissions);
router.post('/update/permissions',updatePermissions);

module.exports = router;