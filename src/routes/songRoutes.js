const express = require('express');
const {getSong} = require('../controllers/songController');
const router = express.Router();

router.get('/', getSong);

module.exports = router;