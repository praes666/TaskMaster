const pool = require('../db');

class KanbanStateController {
    async getAllStates(req, res) {
        try {
            const result = await pool.query('SELECT * FROM kanban_state ORDER BY created_at DESC');
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getStateById(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query('SELECT * FROM kanban_state WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ error: 'State not found' });
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createState(req, res) {
        try {
            const { title, color, kanban_id, author_id } = req.body;
            const result = await pool.query(
                'INSERT INTO kanban_state (title, color, kanban_id, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [title, color, kanban_id, author_id]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateState(req, res) {
        try {
            const { id } = req.params;
            const { title, color } = req.body;
            const result = await pool.query(
                'UPDATE kanban_state SET title = $1, color = $2 WHERE id = $3 RETURNING *',
                [title, color, id]
            );
            if (result.rows.length === 0) return res.status(404).json({ error: 'State not found' });
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteState(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query('DELETE FROM kanban_state WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ error: 'State not found' });
            res.json({ message: 'State deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new KanbanStateController();