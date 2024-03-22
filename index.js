const express = require('express');
const fs = require('fs');

const app = express();

let viewCount = 0; 

function readCounter() {
    try {
        viewCount = parseInt(fs.readFileSync('counter.txt', 'utf8')) || 0;
    } catch (err) {
        console.error('Ошибка чтения файла счетчика:', err);
    }
}

function updateCounter() {
    viewCount++;
    fs.writeFileSync('counter.txt', viewCount.toString());
}

readCounter();

app.get('/', (req, res) => {
    updateCounter(); 
    res.send(`<h1>Корневая страница</h1> <p>Количество просмотров: ${viewCount}</p> <a href="/about">Ссылка на страницу /about</a>`);
});

app.get('/about', (req, res) => {
    updateCounter(); 
    res.send(`<h1>Страница about</h1> <p>Количество просмотров: ${viewCount}</p> <a href="/">Ссылка на страницу /</a>`);
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
