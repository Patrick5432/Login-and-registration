const express = require("express")
const sqlite3 = require("sqlite3")
const bodyParser = require("body-parser")
const jsonParser = require("jsonparser")

const { open } = require("sqlite")
const { json } = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (res, req) => {
    console.log("Проверка запуска")
})

open({
    filename: "./db/login-and-register.db",
    driver: sqlite3.Database
}).then((db) => {
    app.get('/login', async (req, res) => {
        const peoples = await db.all("SELECT * FROM Peoples")
        res.json(peoples)
        console.log("Общращение к бд")
    })
})

//---------------OTHER-------------------

app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000")
})