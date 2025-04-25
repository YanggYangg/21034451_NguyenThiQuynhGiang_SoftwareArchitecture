const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventoryController');

router.get('/getAllInventorys', inventoryController.getAllInventorys);
router.post('/createInventory', inventoryController.createInventory);
router.put('/updateInventory/:productId', inventoryController.updateInventoryQuantity);
router.get('/getInventoryByProductId/:productId', inventoryController.getInventoryByProductId);
module.exports = router;