const express = require('express');
const { required } = require('@hapi/joi');

const router = express.Router();

router.use('/users', require('./users'));

router.use('/pets', require('./petusers'));

module.exports = router;