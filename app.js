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

//----------------LOGIN--------------------

app.post('/auth/login', jsonParser, (req, res) => {

    const user = req.body

    const loginUser = (dbUser) => {
        if (dbUser.password === md5(user.password)) {
            
            const token = jwt.sign({ id: dbUser.id }, sercet, { 
                expiresIn: 86400
            })
            
            return res.status(200).json({
                data: {
                    user: dbUser,
                    token
                }
            })
        }
        return res.status(403).json({
            error: "Неккоректный логин или пароль"
        })
    }

})

//---------------OTHER-------------------

app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000")
})