const pool = require('../db');

class KanbanTaskController {
    async getAllTasks(req, res) {
        try {
            const result = await pool.query('SELECT * FROM kanban_task ORDER BY created_at DESC');
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getTaskById(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query('SELECT * FROM kanban_task WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ error: 'Task not found' });
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createTask(req, res) {
        try {
            const { title, description, kanban_id, state_id, author_id } = req.body;
            const result = await pool.query(
                'INSERT INTO kanban_task (title, description, kanban_id, state_id, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [title, description, kanban_id, state_id, author_id]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const { title, description, is_completed, state_id } = req.body;
            const completedAt = is_completed ? 'NOW()' : 'NULL';
            const result = await pool.query(
                `UPDATE kanban_task SET title = $1, description = $2, is_completed = $3, state_id = $4, completed_at = ${completedAt} WHERE id = $5 RETURNING *`,
                [title, description, is_completed, state_id, id]
            );
            if (result.rows.length === 0) return res.status(404).json({ error: 'Task not found' });
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query('DELETE FROM kanban_task WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ error: 'Task not found' });
            res.json({ message: 'Task deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new KanbanTaskController();
