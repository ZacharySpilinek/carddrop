require('dotenv').config()
const express = require('express')
const app = express()
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./Controllers/authController')
const userCtrl = require('./Controllers/userController')

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.post('/auth/logout', authCtrl.logout)

app.get('/user', userCtrl.getUser)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db is connected')
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} cards in the drop`))
})
