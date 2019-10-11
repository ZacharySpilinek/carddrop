require('dotenv').config()
const express = require('express')
const app = express()
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const massive = require('massive')
const cron = require('node-cron')
const session = require('express-session')
const moment = require('moment')
moment().format()
const authCtrl = require('./Controllers/authController')
const userCtrl = require('./Controllers/userController')
const treeCtrl = require('./Controllers/treeController')
const cardCtrl = require('./Controllers/cardController')
const checkoutCtrl = require('./Controllers/checkoutController')
const snipcartCtrl = require('./Controllers/snipcartController')
const sendGridCtrl = require('./Controllers/sendGridController')

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


// will definitely want to set up the below to only run once a day at midnight MST.
// setInterval(() => {
//     // var now = moment("2013-02-08", "YYYY-MM-DD")
//     // console.log(now)
//     // var month = moment().month()
//     // var date = moment().date()
//     // month++
//     // console.log(`${month}/${date}`) // 10/10
//     var monthSevenDaysFromNow = moment().add(7, 'days').format("MM")
//     var daySevenDaysFromNow = moment().add(7, 'days').format("DD")
//     var bdayMo = 10
//     var bdayDay = 17
//     // if (`${bdayMo}/${bdayDay}` === `${monthSevenDaysFromNow}/${daySevenDaysFromNow}`){
//     //     console.log('YUP')
//     // } else {
//     //     console.log('NOPE')
//     // }
//     var treePersonBDay = moment(`${bdayMo}-${bdayDay}`, "MM-DD")
//     var sevenDaysFromNow = moment(`${monthSevenDaysFromNow}-${daySevenDaysFromNow}`, "MM-DD")
//     console.log(treePersonBDay.diff(sevenDaysFromNow, 'days'))
// }, 1000)

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

let massivedb

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    massivedb = db
    console.log('db is connected')
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} cards in the drop`))
})

// cron.schedule("45 7 * * *", () => {
//     // The timezone seems to be in daylight savings time. If in summer: set an hour back. If in winter: set for current time.
//     // Default for 8:45am send: "45 7 * * *"
//     sendGridCtrl.sendMassReminderEmail(massivedb)
// }, {
//     scheduled: true,
//     timezone: "America/Denver"
// })

setTimeout(() => {
    sendGridCtrl.sendMassReminderEmail(massivedb)
}, 1000 * 2);