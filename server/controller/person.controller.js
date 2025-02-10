const pool = require("../db");

class PersonController {
	async createPerson(req, res) {
		try {
			const { email, login, password, first_name, last_name } = req.body;
			const newPerson = await pool.query(
				`INSERT INTO person (email, login, password, first_name, last_name) 
				 VALUES ($1, $2, $3, $4, $5) RETURNING *`,
				[email, login, password, first_name, last_name]
			);
			res.json(newPerson.rows[0]);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async getAllPersons(req, res) {
		try {
			const persons = await pool.query("SELECT * FROM person");
			res.json(persons.rows);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async getPersonById(req, res) {
		try {
			const { id } = req.params;
			const person = await pool.query("SELECT * FROM person WHERE id = $1", [
				id,
			]);

			if (person.rows.length === 0) {
				return res.status(404).json({ message: "Пользователь не найден" });
			}

			res.json(person.rows[0]);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async updatePerson(req, res) {
		try {
			const { id } = req.params;
			const { email, login, password, first_name, last_name } = req.body;

			const updatedPerson = await pool.query(
				`UPDATE person SET 
				email = COALESCE($1, email),
				login = COALESCE($2, login),
				password = COALESCE($3, password),
				first_name = COALESCE($4, first_name),
				last_name = COALESCE($5, last_name),
				updated_at = CURRENT_TIMESTAMP
				WHERE id = $6 RETURNING *`,
				[email, login, password, first_name, last_name, id]
			);

			if (updatedPerson.rows.length === 0) {
				return res.status(404).json({ message: "Пользователь не найден" });
			}

			res.json(updatedPerson.rows[0]);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async deletePerson(req, res) {
		try {
			const { id } = req.params;
			const deletedPerson = await pool.query(
				"DELETE FROM person WHERE id = $1 RETURNING *",
				[id]
			);

			if (deletedPerson.rows.length === 0) {
				return res.status(404).json({ message: "Пользователь не найден" });
			}

			res.json({ message: "Пользователь удален" });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
}

module.exports = new PersonController();
