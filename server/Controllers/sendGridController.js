const sgMail = require('@sendgrid/mail');
const moment = require('moment')
moment().format()

module.exports = {
    sendMassReminderEmail: async (db) => {
    // this function sends all of the emails to customers that have a person in their tree whose birthday is coming up in seven days and are set to deliver via mail.
    // The email reminds them to fill out their cards.
    let monthSevenDaysFromNow = moment().add(7, 'days').format("M")
    // if the day is Oct 25, it will equal 10
    let daySevenDaysFromNow = moment().add(7, 'days').format("D")
    // if the day is Oct 25, it will equal 1 (because it'll be November 1st)
    let customersToEmail = await db.get_customers_by_7_day_bday([monthSevenDaysFromNow, daySevenDaysFromNow])
    // result is an array of objects of *customers and their *tree members
    // *only customers who actually have an order
    // *only tree members whose birthdays are 7 days from now

    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Merge fields: {{ customer }}, {{ name }}
    // Customer = person who signed up for a box
    // Name = name of person whose birthday is coming up in 7 days
    let emails = []
    customersToEmail.forEach(el => {
        emails.push({
            email: el.email,
            customer: el.first_name,
            name: el.rel_name
        })
    })
    let persArr = []
    emails.forEach(el => {
        persArr.push(
        {
            to: [{email: el.email}],
            dynamic_template_data: {
                customer: el.customer || "Friend",
                name: el.name || "Your Connection"
            }
        })
    })
    const msg = {
        from: {
            email: "info@thecarddrop.com",
            name: "CardDrop"
        },
        template_id: "d-7eed81ee3483482982edeb3bcb698425",
        personalizations:
        persArr
    }
    sgMail.send(msg);
    console.log(`${emails.length} emails sent!`)
    }
}

// const msg = {
//     from: "test@example.com",
//     template_id: "d-7eed81ee3483482982edeb3bcb698425",
//     personalizations: [
//         {
//             to: [{email: "zachary.spilinek@gmail.com"}],
//             dynamic_template_data: {
//                 name: "mckayicus",
//                 customer: "Jarrad"
//             }
//         },
//         {
//             to: [{email: "zachary.spilinek@gmail.com"}],
//             dynamic_template_data: {
//                 name: "derpitidusnodemo"
//             }
//         },
//         {
//             to: [{email: "qbotzach@yahoo.com"}],
//             dynamic_template_data: {
//                 name: "zachariausicus"
//             }
//         }
//     ]
// }

// const msg = {
//     "from": "test@example.com",
//     "templateId": "d-7eed81ee3483482982edeb3bcb698425",
//     "personalizations": [
//         {
//             "to": [{"email": "zachary.spilinek@gmail.com"}],
//             "dynamicTemplateData": {
//                 "name": "mckayicus"
//             }
//         }
//     ]
// }

// const msg = {
//     "from": "test@example.com",
//     "templateId": "d-7eed81ee3483482982edeb3bcb698425",
//     "dynamicTemplateData": {
//         "f_name": "Briandicus",
//     },
//     "personalizations": [
//         {
//             "to": "zachary.spilinek@gmail.com",
//             "substitutions": {
//                 "%f_name%": "mckayicus"
//             }
//         },
//         {
//             "to": "qbotzach@yahoo.com"
//         }
//     ],
//     "substitutionWrappers": [
//         "{{",
//         "}}"
//     ]
// }

// const msg = {
//     "from": "test@example.com",
//     "templateId": "d-7eed81ee3483482982edeb3bcb698425",
//     "personalizations": [
//         {
//             "to": "zachary.spilinek@gmail.com",
//             "substitutions": {
//                 "%f_name%": "mckayicus"
//             }
//         }
//     ],
//     "substitutionWrappers": [
//         "{{",
//         "}}"
//     ]
// }
// sgMail.send(msg);
// console.log('Email sent!')
// }
// }


// the below is with the "send_at" property. We don't need it since our cron job takes care of it.
// const msg = {
//     to: [
//         {"email": 'zachary.spilinek@gmail.com'},
//         {"email": 'qbotzach@yahoo.com'}
//     ],
//     from: 'test@example.com',
//     templateId: 'd-7eed81ee3483482982edeb3bcb698425',
//     dynamic_template_data: {
//         f_name: 'Zacherias'
//     },
//     send_at: 1570770000
//   };