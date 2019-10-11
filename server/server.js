require('dotenv').config()
const express = require('express')
const app = express()
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./Controllers/authController')
const userCtrl = require('./Controllers/userController')
const treeCtrl = require('./Controllers/treeController')
const cardCtrl = require('./Controllers/cardController')
const checkoutCtrl = require('./Controllers/checkoutController')
const snipcartCtrl = require('./Controllers/snipcartController')

app.use(express.static(`${__dirname}/../build`));
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
app.put('/user/save', userCtrl.saveUser)
app.get('/session', userCtrl.getSession)

app.get('/api/tree/:cust_id', treeCtrl.getTree)
app.post('/api/tree/save/:cust_id', treeCtrl.saveTree)
app.post('/api/tree/delete', treeCtrl.deleteTree)

app.get('/api/cards/category', cardCtrl.getCardsByCategory)
app.get('/api/cards/categories', cardCtrl.getCategories)
app.put('/api/card/save', cardCtrl.saveCard)
app.get('/api/cards/saved/:cust_id', cardCtrl.savedCards)

app.get('/api/checkout/yearly-drop/:total/:cards/:stamps/:cust_id', checkoutCtrl.getYearlyDropTotal)

app.post('/api/snipcart', snipcartCtrl.snipcartWebhook)
app.get('/api/snipcart/allorders', snipcartCtrl.getAllOrders)
app.post('/api/snipcart/subscription/pause', snipcartCtrl.pauseSubscription)


app.get('/session', (req, res, next) => {
    res.status(200).send(req.session)
})

const path = require('path')
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db is connected')
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} cards in the drop`))
})
