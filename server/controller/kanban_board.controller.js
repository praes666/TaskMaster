const pool = require('../db');

class KanbanBoardController {
    async getAllBoards(req, res) {
        try {
            const result = await pool.query('SELECT * FROM kanban_board ORDER BY created_at DESC');
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getBoardById(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query('SELECT * FROM kanban_board WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ error: 'Board not found' });
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createBoard(req, res) {
        try {
            const { title, description, owner_id } = req.body;
            const result = await pool.query(
                'INSERT INTO kanban_board (title, description, owner_id) VALUES ($1, $2, $3) RETURNING *',
                [title, description, owner_id]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateBoard(req, res) {
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            const result = await pool.query(
                'UPDATE kanban_board SET title = $1, description = $2 WHERE id = $3 RETURNING *',
                [title, description, id]
            );
            if (result.rows.length === 0) return res.status(404).json({ error: 'Board not found' });
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteBoard(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query('DELETE FROM kanban_board WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ error: 'Board not found' });
            res.json({ message: 'Board deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new KanbanBoardController();
