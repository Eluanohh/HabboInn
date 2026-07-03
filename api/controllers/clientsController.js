const { pool } = require('../database/connection');

async function getItems(req, res) {
    try {
        const [clients] = await pool.query('SELECT * FROM clientes;');
        return res.status(200).json(clients);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error getting clients"
        });
    }
};

async function getItemById(req, res) {
    try {
        const [clients] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [req.params.id]);
        return res.status(200).json(clients);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error getting client"
        });
    }
};

async function createItem(req, res) {
    try {
        const [clients] = await pool.query('INSERT INTO clientes (nome_cliente, email, telefone) VALUES (?, ?, ?)',
            [req.body.name_cliente, req.body.email, req.body.telefone]);
        return res.status(201).json({
            massage: "Client created successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error creating client"
        });
    }
};

async function updateItem(req, res) {
    try {
        const [clients] = await pool.query('UPDATE clientes SET nome_cliente = ?, email = ?, telefone = ? WHERE id_cliente = ?',
            [req.body.name_cliente, req.body.email, req.body.telefone, req.params.id]);
        return res.status(200).json({
            massage: "Client updated successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error updating client"
        });
    }
};

async function deleteItem(req, res) {
    try {
        const [clients] = await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [req.params.id]);
        return res.status(200).json({
            massage: "Client deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error deleting client"
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

