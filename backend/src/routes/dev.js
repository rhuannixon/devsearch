const express = require('express');
const router = express.Router();
const { dev } = require('./../controller');

router.post('/dev', dev.save);
router.get('/dev', dev.list);
router.get('/search', dev.search);

module.exports = router;