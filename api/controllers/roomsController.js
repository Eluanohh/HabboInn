const { pool } = require('../database/connection');

async function getItems(req, res) {
    try {
        const [rooms] = await pool.query('SELECT * FROM quartos;');
        return res.status(200).json(rooms);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error getting rooms"
        });
    }
};

async function getItemById(req, res) {
    try {
        const [rooms] = await pool.query('SELECT * FROM quartos WHERE id_quarto = ?', [req.params.id]);
        return res.status(200).json(rooms);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error getting room"
        });
    }
};

async function getAvailableRooms(req, res) {

    console.log("BODY:", req.body);

    try {

        const { checkin, checkout, pessoas } = req.body;

        const [rooms] = await pool.query(
            `SELECT *
             FROM quartos
             WHERE capacidade >= ?
             AND id_quarto NOT IN (
                 SELECT id_quarto
                 FROM reservas
                 WHERE data_checkin < ?
                 AND data_checkout > ?
             )`,
            [pessoas, checkout, checkin]
        );

        console.log("ROOMS:", rooms);

        return res.status(200).json(rooms);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error getting available rooms"
        });
    }
}

async function createItem(req, res) {
    try {
        const [rooms] = await pool.query(
    `INSERT INTO quartos
    (nome_quarto, tipo, capacidade, preco_cambios, avaliacao)
    VALUES (?, ?, ?, ?, ?)`,
    [
        req.body.nome_quarto,
        req.body.tipo,
        req.body.capacidade,
        req.body.preco_cambios,
        req.body.avaliacao
    ]
);
        return res.status(201).json({
            massage: "Room created successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error creating room"
        });
    }
};

async function updateItem(req, res) {
    try {
        const [rooms] = await pool.query(
    `UPDATE quartos
    SET nome_quarto = ?,
        tipo = ?,
        capacidade = ?,
        preco_cambios = ?,
        avaliacao = ?
    WHERE id_quarto = ?`,
    [
        req.body.nome_quarto,
        req.body.tipo,
        req.body.capacidade,
        req.body.preco_cambios,
        req.body.avaliacao,
        req.params.id
    ]
);
        return res.status(200).json({
            massage: "Room updated successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error updating room"
        });
    }
};

async function deleteItem(req, res) {
    try {
        const [rooms] = await pool.query('DELETE FROM quartos WHERE id_quarto = ?', [req.params.id]);
        return res.status(200).json({
            massage: "Room deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error deleting room"
        });
    }
};

module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getAvailableRooms
};
