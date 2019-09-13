var express = require('express');
var router = express.Router();

const userController = require('./user');
const projectController = require('./project');
const billController = require('./bill');

router.use('/user', userController);
router.use('/project', projectController);
router.use('/bill', billController);

module.exports = router;