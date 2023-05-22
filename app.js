const express = require("express")
const sqlite3 = require("sqlite3")
const bodyParser = require("body-parser")

const { open } = require("sqlite")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (res, req) => {
    console.log("Проверка запуска")
})

open({
    filename: "./db/login-and-register",
    driver: sqlite3.Database
}).then((db) => {
    app.get('/login', async (res, req) => {
        const peoples = await db.all("SELECT * FROM Peoples")
        console.log("Общращение к бд")
        res.json(peoples)
    })
})

app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000")
})