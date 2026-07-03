const express = require('express');
const router = express.Router();

const roomsController = require('../controllers/roomsController');

router.get('/', roomsController.getItems);

router.get('/:id', roomsController.getItemById);

router.post('/', roomsController.createItem);

router.put('/:id', roomsController.updateItem);

router.delete('/:id', roomsController.deleteItem);

module.exports = router;