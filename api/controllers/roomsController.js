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

async function createItem(req, res) {
    try {
        const [rooms] = await pool.query('INSERT INTO quartos (nome_quarto, tipo, preco_cambios, avaliacao) VALUES (?, ?, ?, ?)',
            [req.body.name_quarto, req.body.tipo, req.body.preco_cambios, req.body.avaliacao]);
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
        const [rooms] = await pool.query('UPDATE quartos SET nome_quarto = ?, tipo = ?, preco_cambios = ?, avaliacao = ? WHERE id_quarto = ?',
            [req.body.name_quarto, req.body.tipo, req.body.preco_cambios, req.body.avaliacao, req.params.id]);
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
    deleteItem
};

