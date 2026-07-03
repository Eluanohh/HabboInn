const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController');

router.get('/', reservationController.getItems);

router.get('/:id', reservationController.getItemById);

router.post('/', reservationController.createItem);

router.put('/:id', reservationController.updateItem);

router.delete('/:id', reservationController.deleteItem);

module.exports = router;