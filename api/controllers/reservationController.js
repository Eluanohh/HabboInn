const { pool } = require('../database/connection');

async function getItems(req, res) {
    try {
        const [reservations] = await pool.query('SELECT * FROM reservas;');
        return res.status(200).json(reservations);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error getting reservations"
        });
    }
};

async function getItemById(req, res) {
    try {
        const [reservations] = await pool.query('SELECT * FROM reservas WHERE id_reserva = ?', [req.params.id]);
        return res.status(200).json(reservations);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error getting reservation"
        });
    }
};

async function createItem(req, res) {
    try {
        const [reservations] = await pool.query('INSERT INTO reservas (id_cliente, id_quarto, data_checkin, data_checkout) VALUES (?, ?, ?, ?)',
            [req.body.id_cliente, req.body.id_quarto, req.body.data_checkin, req.body.data_checkout]);
        return res.status(201).json({
            massage: "Reservation created successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error creating reservation"
        });
    }
};

async function updateItem(req, res) {
    try {
        const [reservations] = await pool.query('UPDATE reservas SET id_cliente = ?, id_quarto = ?, data_checkin = ?, data_checkout = ? WHERE id_reserva = ?',
            [req.body.id_cliente, req.body.id_quarto, req.body.data_checkin, req.body.data_checkout, req.params.id]);
        return res.status(200).json({
            massage: "Reservation updated successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error updating reservation"
        });
    }
};

async function deleteItem(req, res) {
    try {
        const [reservations] = await pool.query('DELETE FROM reservas WHERE id_reserva = ?', [req.params.id]);
        return res.status(200).json({
            massage: "Reservation deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error deleting reservation"
        });
    }
};

module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};

