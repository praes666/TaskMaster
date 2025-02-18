const express = require('express');
const pool = require('../db');
const router = express.Router();

// Универсальный метод для генерации HTML-таблицы
function generateTableHtml(data) {
    if (!data || data.length === 0) return '<h2>Нет данных для отображения</h2>';

    const columns = Object.keys(data[0]); // Получаем заголовки колонок
    let table = '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">';

    // Заголовок таблицы
    table += '<thead><tr>';
    columns.forEach(col => table += `<th>${col}</th>`);
    table += '</tr></thead>';

    // Данные таблицы
    table += '<tbody>';
    data.forEach(row => {
        table += '<tr>';
        columns.forEach(col => table += `<td>${row[col]}</td>`);
        table += '</tr>';
    });
    table += '</tbody></table>';

    return table;
}

// Роут для отображения таблицы с данными из любой таблицы
router.get('/pretty/:tableName', async (req, res) => {
    try {
        const { tableName } = req.params;
        const result = await pool.query(`SELECT * FROM ${tableName} ORDER BY id DESC`);
        const tableHtml = generateTableHtml(result.rows);
        
        const htmlPage = `
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Таблица ${tableName}</title>
            </head>
            <body>
                <h1>Таблица: ${tableName}</h1>
                ${tableHtml}
            </body>
            </html>
        `;

        res.send(htmlPage);
    } catch (err) {
        res.status(500).send(`<h2>Ошибка: ${err.message}</h2>`);
    }
});

module.exports = router;
