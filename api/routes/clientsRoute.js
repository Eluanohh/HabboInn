const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clientsController');

router.get('/', clientsController.getItems);

router.get('/:id', clientsController.getItemById);

router.post('/', clientsController.createItem);

router.put('/:id', clientsController.updateItem);

router.delete('/:id', clientsController.deleteItem);

module.exports = router;