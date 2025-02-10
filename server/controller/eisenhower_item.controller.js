const pool = require("../db"); // Импорт соединения с БД

class EisenhowerItemController {
	// Создать задачу
	async createItem(req, res) {
		try {
			const {
				title,
				description,
				is_important,
				is_urgent,
				user_id,
				deadline_at,
				reminder_at,
			} = req.body;
			const newItem = await pool.query(
				`INSERT INTO eisenhower_item (title, description, is_important, is_urgent, user_id, deadline_at, reminder_at) 
				 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
				[
					title,
					description,
					is_important,
					is_urgent,
					user_id,
					deadline_at,
					reminder_at,
				]
			);
			res.json(newItem.rows[0]);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Ошибка при создании задачи" });
		}
	}

	// Получить все задачи
	async getAllItems(req, res) {
		try {
			const allItems = await pool.query("SELECT * FROM eisenhower_item");
			res.json(allItems.rows);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Ошибка при получении списка задач" });
		}
	}

	// Получить задачу по ID
	async getItemById(req, res) {
		try {
			const { id } = req.params;
			const item = await pool.query(
				"SELECT * FROM eisenhower_item WHERE id = $1",
				[id]
			);
			if (item.rows.length === 0)
				return res.status(404).json({ message: "Задача не найдена" });
			res.json(item.rows[0]);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Ошибка при получении задачи" });
		}
	}

	// Обновить задачу
	async updateItem(req, res) {
		try {
			const { id } = req.params;
			const {
				title,
				description,
				is_important,
				is_urgent,
				is_completed,
				deadline_at,
				reminder_at,
			} = req.body;
			const updatedItem = await pool.query(
				`UPDATE eisenhower_item 
				SET title = $1, description = $2, is_important = $3, is_urgent = $4, is_completed = $5, deadline_at = $6, reminder_at = $7
				WHERE id = $8 RETURNING *`,
				[
					title,
					description,
					is_important,
					is_urgent,
					is_completed,
					deadline_at,
					reminder_at,
					id,
				]
			);
			if (updatedItem.rows.length === 0)
				return res.status(404).json({ message: "Задача не найдена" });
			res.json(updatedItem.rows[0]);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Ошибка при обновлении задачи" });
		}
	}

	// Удалить задачу
	async deleteItem(req, res) {
		try {
			const { id } = req.params;
			const deletedItem = await pool.query(
				"DELETE FROM eisenhower_item WHERE id = $1 RETURNING *",
				[id]
			);
			if (deletedItem.rows.length === 0)
				return res.status(404).json({ message: "Задача не найдена" });
			res.json({ message: "Задача удалена", item: deletedItem.rows[0] });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Ошибка при удалении задачи" });
		}
	}
}

module.exports = new EisenhowerItemController();
