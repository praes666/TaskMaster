const pool = require('../db');

class KanbanPersonAdmissionController {
    async getAllAdmissions(req, res) {
        try {
            const result = await pool.query('SELECT * FROM kanban_person_admission ORDER BY created_at DESC');
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAdmissionById(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query('SELECT * FROM kanban_person_admission WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ error: 'Admission not found' });
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createAdmission(req, res) {
        try {
            const { kanban_id, grantee_id, trustee_id, is_active } = req.body;
            const result = await pool.query(
                'INSERT INTO kanban_person_admission (kanban_id, grantee_id, trustee_id, is_active) VALUES ($1, $2, $3, $4) RETURNING *',
                [kanban_id, grantee_id, trustee_id, is_active]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateAdmission(req, res) {
        try {
            const { id } = req.params;
            const { is_active } = req.body;
            const result = await pool.query(
                'UPDATE kanban_person_admission SET is_active = $1 WHERE id = $2 RETURNING *',
                [is_active, id]
            );
            if (result.rows.length === 0) return res.status(404).json({ error: 'Admission not found' });
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteAdmission(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query('DELETE FROM kanban_person_admission WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ error: 'Admission not found' });
            res.json({ message: 'Admission deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new KanbanPersonAdmissionController();
