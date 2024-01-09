const express = require('express');
const router = express.Router();

const StaticController = require('../controllers/StaticController');

router.get('/video/:id', StaticController.getVideo);
router.get('/static/video/:id', StaticController.getVideo);
router.get('/static/images/:id', StaticController.getImage);

module.exports = router;
