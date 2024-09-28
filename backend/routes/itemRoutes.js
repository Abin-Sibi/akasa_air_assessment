const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/add-food-item',itemController.addFoodItem);
router.post('/update-food-item',itemController.updateItem);
router.get('/get-all-food',itemController.getAllfood)

module.exports = router;