const express = require('express');
const router = express.Router();
const cow_controller = require('../controllers/cow_controller');

router.get('/', cow_controller.getCow);
router.get('/:cow_id', cow_controller.getIdCow);

module.exports = router;