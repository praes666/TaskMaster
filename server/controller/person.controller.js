const pool = require("../db");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY;

class PersonController {
	async createPerson(req, res) {
		try {
			const { login, email, password } = req.body;
			const personExist = await  pool.query(
				`SELECT * FROM person WHERE login = $1 OR email = $2`,
				[login, email]
			)
			if(personExist.rows.length === 0){
				const hashedPassword = bcrypt.hashSync(password, 10)
				await pool.query(
					`INSERT INTO person (login, email, password) 
					 VALUES ($1, $2, $3)`,
					[login, email, hashedPassword]
				);
			res.status(200).json({message: 'Registration complete'});
			}else res.status(400).json({message: 'User already exists'})
		} catch (error) {
			console.log('createPerson error: ', error);
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

	async loginPerson(req, res) {
        try {
            const { login, password } = req.body;

            // Ищем пользователя по логину или email
            const user = await pool.query(
                `SELECT * FROM person WHERE login = $1 OR email = $1`,
                [login]
            );

            if (user.rows.length === 0) {
                return res.status(400).json({ message: "Неверные данные" });
            }

            const person = user.rows[0];

            // Проверяем пароль
            const isPasswordValid = bcrypt.compareSync(password, person.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Неверные данные" });
            }

            // Создаем JWT-токен
            const token = jwt.sign(
                { id: person.id, login: person.login },
                SECRET_KEY,
                { expiresIn: "7d" } // Токен будет работать 7 дней
            );

            res.json({ token, user: { id: person.id, login: person.login, email: person.email } });
        } catch (error) {
            console.log('loginPerson error: ', error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PersonController();
