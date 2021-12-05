const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/challenges', require('./challenges'))

module.exports = router;